from rest_framework import permissions
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)

from api.permissions import IsSuperUser
from uav.models import UAVCategory
from uav.serializers import UAVCategoryCreateUpdateSerializer, UAVCategorySerializer


class UAVCategoryListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = UAVCategory.objects.all()
    serializer_class = UAVCategorySerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class UAVCategoryDetailView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = UAVCategory.objects.all()
    serializer_class = UAVCategorySerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class UAVCategoryCreateView(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

    queryset = UAVCategory.objects.all()
    serializer_class = UAVCategoryCreateUpdateSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UAVCategoryUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

    queryset = UAVCategory.objects.all()
    serializer_class = UAVCategoryCreateUpdateSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class UAVCategoryDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

    queryset = UAVCategory.objects.all()
    serializer_class = UAVCategorySerializer

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
