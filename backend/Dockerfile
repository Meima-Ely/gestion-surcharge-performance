FROM python:3.12-slim
WORKDIR /app
COPY . .

RUN pip install --no-cache-dir flask flask-cors prometheus_client gunicorn


HEALTHCHECK --interval=5s --timeout=3s --retries=5 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:5000/health')"

EXPOSE 5000

CMD ["gunicorn", "--workers=2", "--threads=4", "--bind=0.0.0.0:5000", "app:app"]