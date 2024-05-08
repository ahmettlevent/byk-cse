from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
)
from rest_framework.permissions import AllowAny

from api.permissions import IsRequesterOrSuperUser, IsSuperUser
from user.serializers import RegisterSerializer, UserSerializer


class UserListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class UserDetailView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsRequesterOrSuperUser]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class CurrentUserView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def get_object(self):
        return self.request.user


class RegisterView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    queryset = User.objects.all()


class UserDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsRequesterOrSuperUser]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
