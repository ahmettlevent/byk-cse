from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from uav.models import UAV, UAVCategory

from rental.models import UAVRental


class BaseTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse("register")
        self.login_url = reverse("token_obtain_pair")

        self.super_user_data = {
            "email": "test@mail.com",
            "username": "testuser",
            "password": "testpassword",
            "first_name": "test",
            "last_name": "user",
        }

        self.user_data = {
            "email": "test2@mail.com",
            "username": "testuser2",
            "password": "testpassword",
            "first_name": "test",
            "last_name": "user",
        }

    def register_user(self):
        # Register users
        register_response = self.client.post(
            self.register_url, self.user_data, format="json"
        )

        register_response = self.client.post(
            self.register_url, self.super_user_data, format="json"
        )

        # Give super user permissions to the super user
        super_user = User.objects.get(username=self.super_user_data["username"])
        super_user.is_superuser = True
        super_user.is_staff = True
        super_user.save()

        return register_response

    def login_user(self, is_super_user=False):
        if is_super_user:
            user_data = self.super_user_data
        else:
            user_data = self.user_data
        return self.client.post(self.login_url, user_data, format="json")

    def get_token(self, is_super_user=False):
        response = self.login_user(is_super_user)
        return response.data["access"]


class UAVRentalTestCase(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.uav_rental_list_url = reverse("uav-rental-list")
        self.uav_rental_create_url = reverse("uav-rental-create")

        # Create UAV Rental Data
        self.uav_rental_data = {
            "rental_date": "2024-12-03T00:00:00Z",
            "return_date": "2024-12-12T00:00:00Z",
        }

    def register_and_create_uav(self):
        # Register Users
        self.register_user()
        token = self.login_user(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token.data['access']}")

        # Create UAV Category
        self.client.post(
            reverse("uav-category-create"),
            {"name": "Category 1", "description": "Category 1 Description"},
            format="json",
        )

        # Create UAV
        token = self.get_token()
        self.client.post(
            reverse("uav-create"),
            {
                "name": "UAV 2",
                "brand": "APL",
                "category_id": UAVCategory.objects.get(name="Category 1").id,
                "model": "Model Y",
                "width": "400",
                "height": "100",
                "weight": "500",
                "price": "1500",
                "stock": "16",
            },
            format="json",
        )

    def test_create_uav_rental(self):
        # Register and Create UAV
        self.register_and_create_uav()

        # Get token and set authorization header
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        # Create UAV Rental
        self.uav_rental_data["uav"] = UAV.objects.get(name="UAV 2").id
        response = self.client.post(
            self.uav_rental_create_url, self.uav_rental_data, format="json"
        )

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UAVRental.objects.count(), 1)

    def test_get_uav_rental_list(self):
        # Register and Create UAV
        self.register_and_create_uav()

        # Get token and set authorization header
        token = self.get_token()

        # Set authorization header
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        # Get UAV Rental List
        response = self.client.get(self.uav_rental_list_url)

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_uav_rental_detail(self):
        # Register and Create UAV
        self.register_and_create_uav()

        # Get token
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        # Create UAV Rental
        self.uav_rental_data["uav"] = UAV.objects.get(name="UAV 2").id
        uav_rental_resp = self.client.post(
            self.uav_rental_create_url, self.uav_rental_data, format="json"
        )

        # Get UAV Rental Detail
        uav_rental_detail_url = reverse(
            "uav-rental-detail", kwargs={"pk": uav_rental_resp.data["id"]}
        )
        response = self.client.get(uav_rental_detail_url)

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_uav_rental(self):
        # Register and Create UAV
        self.register_and_create_uav()

        # Get token and set authorization header
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        # Create UAV Rental
        self.uav_rental_data["uav"] = UAV.objects.get(name="UAV 2").id

        uav_rental_resp = self.client.post(
            self.uav_rental_create_url, self.uav_rental_data, format="json"
        )

        # Update UAV Rental
        uav_rental_update_url = reverse(
            "uav-rental-update", kwargs={"pk": uav_rental_resp.data["id"]}
        )
        response = self.client.put(
            uav_rental_update_url, self.uav_rental_data, format="json"
        )

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_200_OK)
