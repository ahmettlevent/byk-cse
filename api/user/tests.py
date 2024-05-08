from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken


class UserTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse("register")
        self.login_url = reverse("token_obtain_pair")
        self.user = {
            "email": "testuser@test.com",
            "username": "testuser",
            "password": "testpassword",
            "first_name": "test",
            "last_name": "user",
        }
        self.user2 = {
            "email": "testuser2@test.com",
            "username": "testuser2",
            "password": "testpassword",
            "first_name": "test",
            "last_name": "user",
        }

    def test_remove_user(self):
        # Register user
        register_response = self.client.post(
            self.register_url, self.user, format="json"
        )
        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

        # Get the user id and the dynamic remove url
        user_id = register_response.data["id"]
        dynamic_remove_url = reverse("user-delete", kwargs={"pk": user_id})

        # Get the user and token
        user = User.objects.get(pk=user_id)
        refresh = RefreshToken.for_user(user)

        # Set authorization header with the token and delete the user
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")
        response = self.client.delete(dynamic_remove_url)

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.count(), 0)

    def test_register_user(self):
        # Register user
        response = self.client.post(self.register_url, self.user, format="json")

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "testuser")

    def test_login_user(self):
        # Register user
        self.client.post(self.register_url, self.user, format="json")

        # Login user
        response = self.client.post(self.login_url, self.user, format="json")

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in response.data)

    def test_login_user_invalid_credentials(self):
        # Register user
        self.client.post(self.register_url, self.user, format="json")

        # Login user with invalid credentials
        response = self.client.post(self.login_url, self.user2, format="json")

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse("access" in response.data)
