from rest_framework import permissions
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)

from api.permissions import IsRequesterOrSuperUser
from rental.models import UAVRental
from rental.serializers import (
    UAVRentalCreateSerializer,
    UAVRentalSerializer,
    UAVRentalUpdateSerializer,
)


class UAVRentalListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsRequesterOrSuperUser]

    queryset = UAVRental.objects.all()
    serializer_class = UAVRentalSerializer

    def get_queryset(self):
        # If the user is a super user, returns all UAV rentals.
        # Otherwise, returns only the UAV rentals of the requester.
        if self.request.user.is_superuser:
            return UAVRental.objects.all()
        return UAVRental.objects.filter(user=self.request.user)

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


class UAVRentalDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsRequesterOrSuperUser]

    queryset = UAVRental.objects.all()
    serializer_class = UAVRentalSerializer

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
