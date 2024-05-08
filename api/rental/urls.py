from django.urls import path

from rental import views

urlpatterns = [
    # UAV Rental URLs
    path("", views.UAVRentalListView.as_view(), name="uav-rental-list"),
    path("<int:pk>/", views.UAVRentalDetailView.as_view(), name="uav-rental-detail"),
    path("create/", views.UAVRentalCreateView.as_view(), name="uav-rental-create"),
    path("<int:pk>/update/", views.UAVRentalUpdateView.as_view(), name="uav-rental-update"),
    path("<int:pk>/delete/", views.UAVRentalDeleteView.as_view(), name="uav-rental-delete"),
]
