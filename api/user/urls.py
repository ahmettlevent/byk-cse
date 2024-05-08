from django.urls import path

from user import views

urlpatterns = [
    path("", views.UserListView.as_view()),
    path("<int:pk>/", views.UserDetailView.as_view()),
    path("me/", views.CurrentUserView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path("<int:pk>/delete/", views.UserDeleteView.as_view()),
]
