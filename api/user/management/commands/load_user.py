import os

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create a initial user with username, password, and email."

    def handle(self, *args, **kwargs):
        username = os.environ.get("INIT_USERNAME")
        password = os.environ.get("INIT_PASSWORD")
        email = os.environ.get("INIT_EMAIL")

        if not username or not password or not email:
            self.stderr.write(
                "Please provide INIT_USERNAME, INIT_PASSWORD, and INIT_EMAIL environment variables."
            )
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(f"User {username} already exists. Skipping creation.")
            return

        User.objects.create_user(
            username, email, password, is_superuser=True, is_staff=True, is_active=True
        )
        self.stdout.write(f"User {username} created successfully.")
