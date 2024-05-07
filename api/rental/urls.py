from django.urls import path

from rental import views

urlpatterns = [
    # UAV Rental URLs
    path("", views.UAVRentalListView.as_view()),
    path("<int:pk>/", views.UAVRentalDetailView.as_view()),
    path("create/", views.UAVRentalCreateView.as_view()),
    path("<int:pk>/update/", views.UAVRentalUpdateView.as_view()),
]
