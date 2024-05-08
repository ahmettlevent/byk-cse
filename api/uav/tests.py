from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from uav.models import UAV


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


class UAVTestCase(BaseTestCase):
    def setUp(self):
        super().setUp()

        self.uav_category_data = {
            "name": "Category 1",
            "description": "Category 1 Description",
        }

        self.uav_data = {
            "name": "UAV 2",
            "brand": "APL",
            "category_id": None,
            "model": "Model Y",
            "width": "400",
            "height": "100",
            "weight": "500",
            "price": "1500",
            "stock": "16",
        }

        self.uav_data_updated = {
            "name": "UAV 3",
            "brand": "APL",
            "category_id": None,
            "model": "Model Y",
            "width": "400",
            "height": "100",
            "weight": "500",
            "price": "1500",
            "stock": "16",
        }

    def test_create_remove_uav(self):
        # Register users
        register_response = self.register_user()
        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

        # Create UAV Category
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        create_response = self.client.post(
            reverse("uav-category-create"), self.uav_category_data, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        category_id = create_response.data["id"]
        self.uav_data["category_id"] = category_id

        # Create UAV
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        uav_response = self.client.post(
            reverse("uav-create"), self.uav_data, format="json"
        )
        self.assertEqual(uav_response.status_code, status.HTTP_201_CREATED)

        # Remove UAV
        uav_id = uav_response.data["id"]
        remove_response = self.client.delete(
            reverse("uav-delete", kwargs={"pk": uav_id})
        )
        self.assertEqual(remove_response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(UAV.objects.count(), 0)

    def test_list_uav(self):
        # Register users
        register_response = self.register_user()
        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

        # Create UAV Category
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        create_response = self.client.post(
            reverse("uav-category-create"), self.uav_category_data, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        category_id = create_response.data["id"]
        self.uav_data["category_id"] = category_id

        # Create UAV
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        create_response = self.client.post(
            reverse("uav-create"), self.uav_data, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)

        # List UAV
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(reverse("uav-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_uav(self):
        # Register users
        register_response = self.register_user()
        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

        # Create UAV Category
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        create_response = self.client.post(
            reverse("uav-category-create"), self.uav_category_data, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        category_id = create_response.data["id"]
        self.uav_data["category_id"] = category_id

        # Create UAV
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        create_response = self.client.post(
            reverse("uav-create"), self.uav_data, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        uav_id = create_response.data["id"]

        # Update UAV
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        self.uav_data_updated["category_id"] = category_id
        response = self.client.put(
            reverse("uav-update", kwargs={"pk": uav_id}),
            self.uav_data_updated,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(UAV.objects.get().name, "UAV 3")
        self.assertEqual(UAV.objects.count(), 1)

    def test_retrieve_uav(self):
        # Register users
        register_response = self.register_user()
        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

        # Create UAV Category
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        create_response = self.client.post(
            reverse("uav-category-create"), self.uav_category_data, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        category_id = create_response.data["id"]
        self.uav_data["category_id"] = category_id

        # Create UAV
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        create_response = self.client.post(
            reverse("uav-create"), self.uav_data, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        uav_id = create_response.data["id"]

        # Retrieve UAV
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(reverse("uav-detail", kwargs={"pk": uav_id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "UAV 2")
        self.assertEqual(UAV.objects.count(), 1)


class UAVCategoryTestCase(BaseTestCase):
    def setUp(self):
        super().setUp()

        self.uav_category_data = {
            "name": "Category 1",
            "description": "Category 1 Description",
        }

        self.uav_category_data_updated = {
            "name": "Category 2",
            "description": "Category 2 Description",
        }

    def test_create_remove_uav_category(self):
        # Register users
        register_response = self.register_user()
        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

        # Create UAV Category
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        create_response = self.client.post(
            reverse("uav-category-create"), self.uav_category_data, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)

        # Remove UAV Category
        category_id = create_response.data["id"]
        remove_response = self.client.delete(
            reverse("uav-category-delete", kwargs={"pk": category_id})
        )
        self.assertEqual(remove_response.status_code, status.HTTP_204_NO_CONTENT)

    def test_list_uav_category(self):
        # Register users
        register_response = self.register_user()
        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

        # Create UAV Category
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        create_response = self.client.post(
            reverse("uav-category-create"), self.uav_category_data, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)

        # List UAV Category
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(reverse("uav-category-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_uav_category(self):
        # Register users
        register_response = self.register_user()
        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

        # Create UAV Category
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        create_response = self.client.post(
            reverse("uav-category-create"), self.uav_category_data, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        category_id = create_response.data["id"]

        # Update UAV Category
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.put(
            reverse("uav-category-update", kwargs={"pk": category_id}),
            self.uav_category_data_updated,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Category 2")

    def test_retrieve_uav_category(self):
        # Register users
        register_response = self.register_user()
        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

        # Create UAV Category
        token = self.get_token(is_super_user=True)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        create_response = self.client.post(
            reverse("uav-category-create"), self.uav_category_data, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        category_id = create_response.data["id"]

        # Retrieve UAV Category
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(
            reverse("uav-category-detail", kwargs={"pk": category_id})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Category 1")
        self.assertEqual(response.data["description"], "Category 1 Description")
