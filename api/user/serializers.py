from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "is_staff",
            "is_active",
            "date_joined",
            "last_login",
            "first_name",
            "last_name",
            "is_superuser",
        )
