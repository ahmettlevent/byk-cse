import logging

from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    # Include auth token URLs
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # Include user URLs
    re_path(r"^user/", include("user.urls")),
    # Include UAV URLs
    re_path(r"^uav/", include("uav.urls")),
    # Include rental URLs
    re_path(r"^rental/", include("rental.urls")),
]

# Add URL prefix if set in settings
if settings.URL_PREFIX:
    logging.info(f"Adding URL prefix: {settings.URL_PREFIX}")
    urlpatterns = [path(f"{settings.URL_PREFIX}/", include(urlpatterns))]
