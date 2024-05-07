from django.urls import path

from user import views

urlpatterns = [
    path("", views.UserListView.as_view()),
    path("<int:pk>/", views.UserDetailView.as_view()),
]