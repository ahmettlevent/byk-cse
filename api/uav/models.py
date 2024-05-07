from django.db import models

# Create your models here.


class UAVCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)

    # Meta fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey("auth.User", on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class UAV(models.Model):
    name = models.CharField(max_length=100)

    # UAV Specifications
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    category = models.ForeignKey(UAVCategory, on_delete=models.CASCADE)

    # UAV Dimensions
    width = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    height = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    weight = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    # Price and Stock
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stock = models.PositiveIntegerField(null=True, blank=True)

    # Meta fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey("auth.User", on_delete=models.CASCADE)

    def __str__(self):
        return self.name
