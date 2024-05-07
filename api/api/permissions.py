from rest_framework.permissions import BasePermission


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        # Check if the requesting user is a superuser
        return request.user and request.user.is_superuser


class IsRequesterOrSuperUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if the requesting user is the object owner or a superuser
        return request.user and (obj == request.user or request.user.is_superuser)
