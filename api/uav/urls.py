from django.urls import path

from uav import views

urlpatterns = [
    # UAV URLs
    path("", views.UAVListView.as_view(), name="uav-list"),
    path("<int:pk>/", views.UAVDetailView.as_view(), name="uav-detail"),
    path("create/", views.UAVCreateView.as_view(), name="uav-create"),
    path("<int:pk>/update/", views.UAVUpdateView.as_view(), name="uav-update"),
    path("<int:pk>/delete/", views.UAVDeleteView.as_view(), name="uav-delete"),
    # UAV Category URLs
    path("category/", views.UAVCategoryListView.as_view(), name="uav-category-list"),
    path("category/<int:pk>/", views.UAVCategoryDetailView.as_view(), name="uav-category-detail"),
    path("category/create/", views.UAVCategoryCreateView.as_view(), name="uav-category-create"),
    path("category/<int:pk>/update/", views.UAVCategoryUpdateView.as_view(), name="uav-category-update"),
    path("category/<int:pk>/delete/", views.UAVCategoryDeleteView.as_view(), name="uav-category-delete"),
]
