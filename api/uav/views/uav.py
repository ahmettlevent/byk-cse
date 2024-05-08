from rest_framework import permissions
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)

from api.permissions import IsSuperUser
from uav.models import UAV
from uav.serializers.uav import UAVCreateUpdateSerializer, UAVSerializer


class UAVListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = UAV.objects.all()
    serializer_class = UAVSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class UAVDetailView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = UAV.objects.all()
    serializer_class = UAVSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class UAVCreateView(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

    queryset = UAV.objects.all()
    serializer_class = UAVCreateUpdateSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UAVUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

    queryset = UAV.objects.all()
    serializer_class = UAVCreateUpdateSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
