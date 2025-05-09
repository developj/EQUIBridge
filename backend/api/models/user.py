from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)  # Enforce unique email
    middle_name = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return self.username