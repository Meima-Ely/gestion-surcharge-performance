# Gestion de la Surcharge et Optimisation des Performances

## Description
Projet de recherche pratique démontrant la gestion de surcharge 
d'un serveur Flask avec monitoring en temps réel via Prometheus et Grafana.

## Architecture
```
Client → NGINX (Load Balancer) → Flask API → Redis (Cache)
                                     ↓
                               Prometheus → Grafana
```

## Démonstration
- 10 requêtes normales  → temps de réponse ~50ms
- 30 requêtes simultanées → surcharge → ~3000ms
- Après optimisation Redis → retour à ~50ms

## Technologies utilisées
- Python Flask
- Prometheus + Grafana
- Redis (cache)
- Docker / Docker Compose

## Comment lancer le projet
```bash
# 1. Cloner le projet
git clone https://github.com/TON_USERNAME/gestion-surcharge-performance

# 2. Lancer avec Docker
docker-compose up

# 3. Accéder aux services
# Flask API   → http://localhost:5000
# Prometheus  → http://localhost:9090
# Grafana     → http://localhost:3000
```

## Auteur
Mohamed — Étudiant en Systèmes Distribués