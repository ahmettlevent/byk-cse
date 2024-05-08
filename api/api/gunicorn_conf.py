import os
from configupdater import ConfigUpdater

# Worker Count
workers = int(os.getenv("WORKER_COUNT", 4))

# Thread Count
threads = int(os.getenv("THREAD_COUNT", 2))

# Gunicorn Port
bind = ":" + os.getenv("GUNICORN_PORT", "8000")

# Log Level
loglevel = os.getenv("LOG_LEVEL", "warning")

# Worker Class
worker_class = os.getenv("WORKER_CLASS", "uvicorn.workers.UvicornWorker")

# Preload App
preload_app = os.getenv("PRELOAD", "True")

# Capture Output
capture_output = os.getenv("LOG_FILE", False)

updater = ConfigUpdater()
