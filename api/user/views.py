from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView

from api.permissions import IsRequesterOrSuperUser, IsSuperUser
from user.serializers import UserSerializer


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
