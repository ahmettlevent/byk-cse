from django.urls import path

from user import views

urlpatterns = [
    path("", views.UserListView.as_view(), name="user-list"),
    path("<int:pk>/", views.UserDetailView.as_view(), name="user-detail"),
    path("me/", views.CurrentUserView.as_view(), name="current-user"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("<int:pk>/delete/", views.UserDeleteView.as_view(), name="user-delete"),
]
