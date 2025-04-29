from django.db import models
from django.conf import settings

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    skills = models.JSONField(default=list, blank=True)  # store as list
    experience = models.CharField(max_length=1000, blank=True)
    linkedin = models.URLField(blank=True)
    interests = models.TextField(blank=True)
    preferred_industries = models.CharField(max_length=1000, blank=True)
    education = models.CharField(max_length=1000, blank=True)
    employment = models.CharField(max_length=1000, blank=True)
    income = models.CharField(max_length=255, blank=True)
    is_single_parent = models.BooleanField(default=False)
    has_disability = models.BooleanField(default=False)
    accessibility_requirements = models.TextField(blank=True)
    opportunity_preferences = models.JSONField(default=list, blank=True)
    preferred_work_format = models.JSONField(default=list, blank=True)
    languages = models.CharField(max_length=255, blank=True)
    devices = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
