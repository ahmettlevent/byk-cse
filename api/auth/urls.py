from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from auth.views import CustomObtainTokenPairView, RegisterView

urlpatterns = [
    path("token/", CustomObtainTokenPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterView.as_view(), name="auth_register"),
]
