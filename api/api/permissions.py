from rest_framework.permissions import BasePermission


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        # Check if the requesting user is a superuser
        return request.user and request.user.is_superuser


class IsRequesterOrSuperUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if obj owner is the requesting user or if the requesting user is a superuser
        if obj == request.user:
            return True

        if request.user.is_superuser:
            return True

        if obj.user == request.user:
            return True

        return False
