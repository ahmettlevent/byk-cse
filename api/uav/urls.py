from django.urls import path

from uav import views

urlpatterns = [
    # UAV URLs
    path("", views.UAVListView.as_view()),
    path("<int:pk>/", views.UAVDetailView.as_view()),
    path("create/", views.UAVCreateView.as_view()),
    path("<int:pk>/update/", views.UAVUpdateView.as_view()),
    # UAV Category URLs
    path("category/", views.UAVCategoryListView.as_view()),
    path("category/<int:pk>/", views.UAVCategoryDetailView.as_view()),
    path("category/create/", views.UAVCategoryCreateView.as_view()),
    path("category/<int:pk>/update/", views.UAVCategoryUpdateView.as_view()),
]
