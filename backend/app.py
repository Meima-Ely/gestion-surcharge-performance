import os
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CONTENT_TYPE_LATEST
import sqlite3
import datetime
import time
import threading

app = Flask(__name__)
CORS(app)

# ============================================================
# MÉTRIQUES PROMETHEUS
# ============================================================
REQUEST_COUNT    = Counter('requests_total', 'Total requests', ['endpoint', 'method', 'server_id'])
REQUEST_LATENCY  = Histogram('request_latency_seconds', 'Request latency', ['endpoint', 'server_id'])
ACTIVE_REQUESTS  = Gauge('active_requests', 'Currently active requests', ['server_id'])

SERVER_ID = os.environ.get('SERVER_ID', 'api1')

# ============================================================
# RATE LIMITER
# ============================================================
request_counts = {}
RATE_LIMIT = 100
lock = threading.Lock()

def check_rate_limit(ip):
    now = time.time()
    with lock:
        if ip not in request_counts:
            request_counts[ip] = []
        request_counts[ip] = [t for t in request_counts[ip] if now - t < 60]
        if len(request_counts[ip]) >= RATE_LIMIT:
            return False
        request_counts[ip].append(now)
        return True

# ✅ Nettoyage périodique des IPs inactives (évite la fuite mémoire)
def cleanup_old_ips():
    while True:
        time.sleep(300)
        now = time.time()
        with lock:
            expired = [ip for ip, times in request_counts.items()
                       if not any(now - t < 60 for t in times)]
            for ip in expired:
                del request_counts[ip]

threading.Thread(target=cleanup_old_ips, daemon=True).start()

# ============================================================
# BASE DE DONNÉES
# ============================================================
DB_PATH = os.environ.get('DB_PATH',
          os.path.join(os.path.dirname(os.path.abspath(__file__)), 'devis.db'))

def get_db():
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:   # ✅ context manager → auto-close
        conn.execute('''CREATE TABLE IF NOT EXISTS devis (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            nom         TEXT NOT NULL,
            email       TEXT NOT NULL,
            entreprise  TEXT,
            type_projet TEXT,
            budget      TEXT,
            delai       TEXT,
            description TEXT,
            date        TEXT,
            server_id   TEXT
        )''')
        conn.commit()

# ✅ init_db appelé au démarrage de l'app (fonctionne avec Gunicorn)
with app.app_context():
    init_db()

# ============================================================
# MIDDLEWARE
# ============================================================
@app.before_request
def before_request():
    request.start_time = time.time()
    ACTIVE_REQUESTS.labels(server_id=SERVER_ID).inc()

# ✅ teardown_request garanti même en cas d'exception (évite le Gauge négatif)
@app.teardown_request
def teardown_request(exception=None):
    ACTIVE_REQUESTS.labels(server_id=SERVER_ID).dec()

@app.after_request
def after_request(response):
    latency = time.time() - request.start_time
    REQUEST_LATENCY.labels(endpoint=request.path, server_id=SERVER_ID).observe(latency)
    REQUEST_COUNT.labels(endpoint=request.path, method=request.method, server_id=SERVER_ID).inc()
    response.headers['X-Server-ID'] = SERVER_ID
    response.headers['Access-Control-Expose-Headers'] = 'X-Server-ID'
    return response

# ============================================================
# ROUTES
# ============================================================
@app.route('/health')
def health():
    try:
        with get_db() as conn:
            conn.execute('SELECT 1')
        db_ok = True
    except (sqlite3.OperationalError, sqlite3.DatabaseError) as e:  # ✅ except ciblé
        app.logger.error(f"DB health check failed: {e}")
        db_ok = False

    return jsonify({
        "status":          "ok" if db_ok else "degraded",
        "server":          SERVER_ID,
        "db":              "ok" if db_ok else "error",
        "active_requests": int(ACTIVE_REQUESTS.labels(server_id=SERVER_ID)._value.get()),
        "timestamp":       datetime.datetime.now().isoformat()
    }), 200 if db_ok else 503

@app.route('/stats')
def stats():
    try:
        with get_db() as conn:
            c = conn.cursor()
            c.execute('SELECT COUNT(*) FROM devis')
            total = c.fetchone()[0]
            today = datetime.date.today().isoformat()
            c.execute("SELECT COUNT(*) FROM devis WHERE date LIKE ?", (f"{today}%",))
            today_count = c.fetchone()[0]
        return jsonify({
            "server":          SERVER_ID,
            "total_devis":     total,
            "today_devis":     today_count,
            "active_requests": int(ACTIVE_REQUESTS.labels(server_id=SERVER_ID)._value.get()),
            "timestamp":       datetime.datetime.now().isoformat()
        })
    except (sqlite3.OperationalError, sqlite3.DatabaseError) as e:
        app.logger.error(f"Stats error: {e}")
        return jsonify({"error": str(e)}), 503

@app.route('/devis', methods=['POST'])
def recevoir_devis():
    # ✅ Lire la vraie IP client (derrière Nginx)
    ip = request.headers.get('X-Forwarded-For', request.remote_addr).split(',')[0].strip()

    if not check_rate_limit(ip):
        return jsonify({"error": "Rate limit depasse. Reessayez dans 1 minute."}), 429

    data = request.json
    if not data:
        return jsonify({"error": "Donnees manquantes"}), 400

    for field in ['nom', 'email', 'type_projet']:
        if not data.get(field):
            return jsonify({"error": f"Champ requis: {field}"}), 400

    try:
        with get_db() as conn:   # ✅ context manager → auto-close + auto-rollback
            c = conn.cursor()
            c.execute('''INSERT INTO devis
                (nom, email, entreprise, type_projet, budget, delai, description, date, server_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                (data['nom'], data['email'], data.get('entreprise', ''),
                 data['type_projet'], data.get('budget', ''), data.get('delai', ''),
                 data.get('description', ''), datetime.datetime.now().isoformat(), SERVER_ID))
            conn.commit()
            new_id = c.lastrowid
        return jsonify({"status": "success", "message": "Devis recu!", "id": new_id, "server": SERVER_ID}), 201
    except (sqlite3.OperationalError, sqlite3.DatabaseError) as e:
        app.logger.error(f"Insert error: {e}")
        return jsonify({"error": str(e)}), 503

@app.route('/devis', methods=['GET'])
def voir_devis():
    try:
        with get_db() as conn:
            c = conn.cursor()
            c.execute('SELECT * FROM devis ORDER BY id DESC')
            rows = c.fetchall()
        return jsonify([{
            "id":          r["id"],
            "nom":         r["nom"],
            "email":       r["email"],
            "entreprise":  r["entreprise"] or '',
            "type_projet": r["type_projet"],
            "budget":      r["budget"] or '',
            "delai":       r["delai"] or '',
            "description": r["description"] or '',
            "date":        r["date"],
            "server_id":   r["server_id"] if "server_id" in r.keys() else SERVER_ID
        } for r in rows])
    except (sqlite3.OperationalError, sqlite3.DatabaseError) as e:
        app.logger.error(f"Select error: {e}")
        return jsonify({"error": str(e)}), 503

@app.route('/metrics')
def metrics():
    return Response(generate_latest(), mimetype=CONTENT_TYPE_LATEST)

if __name__ == '__main__':
    print(f"[{SERVER_ID}] Serveur demarre sur port 5000")
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)