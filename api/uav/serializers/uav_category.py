from rest_framework import serializers

from uav.models import UAVCategory

# UAV Category Serializers


class UAVCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UAVCategory
        fields = (
            "id",
            "name",
            "description",
            "created_at",
            "updated_at",
        )
        depth = 1


class UAVCategoryCreateUpdateSerializer(serializers.ModelSerializer):
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UAVCategory
        fields = ("id", "name", "description", "created_by")
