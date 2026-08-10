import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser

from cloudinary.models import CloudinaryField


class User(AbstractUser):

    email = models.EmailField(unique=True)
    profile_image = CloudinaryField("profile_image", blank=True, null=True)
    email_verified = models.BooleanField(default=False)
    verification_token = models.UUIDField(blank=True, null=True, unique=True)
    password_reset_token = models.UUIDField(blank=True, null=True, unique=True)
    password_reset_created = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.email