from rest_framework import permissions
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)

from api.permissions import IsRequesterOrSuperUser, IsSuperUser
from rental.models import UAVRental
from rental.serializers import UAVRentalUpdateSerializer, UAVRentalSerializer, UAVRentalCreateSerializer


class UAVRentalListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

    queryset = UAVRental.objects.all()
    serializer_class = UAVRentalSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class UAVRentalDetailView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsRequesterOrSuperUser]

    queryset = UAVRental.objects.all()
    serializer_class = UAVRentalSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class UAVRentalCreateView(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = UAVRental.objects.all()
    serializer_class = UAVRentalCreateSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UAVRentalUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsRequesterOrSuperUser]

    queryset = UAVRental.objects.all()
    serializer_class = UAVRentalUpdateSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
