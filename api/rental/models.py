from django.contrib.auth.models import User
from django.db import models


class UAVRental(models.Model):
    # UAV and User
    uav = models.ForeignKey("uav.UAV", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Rental Dates
    rental_date = models.DateTimeField()
    return_date = models.DateTimeField()

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.uav.name
