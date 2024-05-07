from rest_framework import serializers

from uav.models import UAV
from uav.serializers.uav_category import UAVCategorySerializer

# UAV Serializers


class UAVSerializer(serializers.ModelSerializer):
    category = UAVCategorySerializer()

    class Meta:
        model = UAV
        fields = (
            "id",
            "name",
            "brand",
            "model",
            "category",
            "width",
            "height",
            "weight",
            "price",
            "stock",
            "created_at",
            "updated_at",
        )
        depth = 1


class UAVCreateUpdateSerializer(serializers.ModelSerializer):
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=UAVCategorySerializer.Meta.model.objects.all(), source="category"
    )

    class Meta:
        model = UAV
        fields = (
            "name",
            "brand",
            "model",
            "category_id",
            "width",
            "height",
            "weight",
            "price",
            "stock",
            "created_by",
        )
