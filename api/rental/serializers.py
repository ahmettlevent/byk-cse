from django.utils import timezone
from rest_framework import serializers
from uav.serializers import UAVSerializer

from rental.models import UAVRental


class UAVRentalSerializer(serializers.ModelSerializer):
    uav = UAVSerializer()

    class Meta:
        model = UAVRental
        fields = (
            "id",
            "uav",
            "user",
            "rental_date",
            "return_date",
            "created_at",
            "updated_at",
        )
        depth = 1


class UAVRentalCreateSerializer(serializers.ModelSerializer):
    # Foreign Key
    uav = serializers.PrimaryKeyRelatedField(
        queryset=UAVSerializer.Meta.model.objects.all(), required=True
    )
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    # Validation
    validators = [
        serializers.UniqueTogetherValidator(
            queryset=UAVRental.objects.all(),
            fields=["uav", "user", "rental_date", "return_date"],
            message="You have already rented this UAV",
        )
    ]

    # Meta
    class Meta:
        model = UAVRental
        fields = (
            "user",
            "uav",
            "rental_date",
            "return_date",
        )
        extra_kwargs = {
            "rental_date": {"required": True},
            "return_date": {"required": True},
        }

    def validate(self, data):
        # Check if return_date is greater than rental_date
        if data["return_date"] <= data["rental_date"]:
            raise serializers.ValidationError(
                "return_date must be greater than rental_date"
            )

        # Check if rental_date is greater than current date
        if data["rental_date"] <= timezone.now():
            raise serializers.ValidationError(
                "rental_date must be greater than current date"
            )

        return data


class UAVRentalUpdateSerializer(serializers.ModelSerializer):
    # Meta
    class Meta:
        model = UAVRental
        fields = (
            "rental_date",
            "return_date",
        )
        extra_kwargs = {
            "rental_date": {"required": True},
            "return_date": {"required": True},
        }

    def validate(self, data):
        # Check if return_date is greater than rental_date
        if data["return_date"] <= data["rental_date"]:
            raise serializers.ValidationError(
                "return_date must be greater than rental_date"
            )

        # Check if rental_date is greater than current date
        if data["rental_date"] <= timezone.now():
            raise serializers.ValidationError(
                "rental_date must be greater than current date"
            )

        return data
