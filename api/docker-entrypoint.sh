#!/bin/bash

python manage.py migrate
python manage.py load_user

gunicorn api.asgi:application -c api/gunicorn_conf.py
