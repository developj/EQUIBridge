from django.db import models
from django.conf import settings

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    skills = models.JSONField(default=list, blank=True, null=True)
    experience = models.CharField(max_length=1000, blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    interests = models.TextField(blank=True, null=True)
    preferred_industries = models.CharField(max_length=1000, blank=True, null=True)
    education = models.CharField(max_length=1000, blank=True, null=True)
    employment = models.CharField(max_length=1000, blank=True, null=True)
    is_single_parent = models.BooleanField(default=False)
    has_disability = models.BooleanField(default=False)
    accessibility_requirements = models.TextField(blank=True, null=True)
    languages = models.CharField(max_length=255, blank=True, null=True)
    devices = models.JSONField(default=list, blank=True, null=True)

    def __str__(self):
        return f"{self.user.email}'s Profile"
