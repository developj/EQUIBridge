from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models.profile import Profile

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    # Pull in profile fields
    bio = serializers.CharField(source='profile.bio', required=False)
    skills = serializers.ListField(source='profile.skills', required=False)
    experience = serializers.CharField(source='profile.experience', required=False)
    linkedin = serializers.CharField(source='profile.linkedin', required=False)
    interests = serializers.CharField(source='profile.interests', required=False)
    preferred_industries = serializers.CharField(source='profile.preferred_industries', required=False)
    education = serializers.CharField(source='profile.education', required=False)
    employment = serializers.CharField(source='profile.employment', required=False)
    income = serializers.CharField(source='profile.income', required=False)
    is_single_parent = serializers.BooleanField(source='profile.is_single_parent', required=False)
    has_disability = serializers.BooleanField(source='profile.has_disability', required=False)
    accessibility_requirements = serializers.CharField(source='profile.accessibility_requirements', required=False)
    opportunity_preferences = serializers.ListField(source='profile.opportunity_preferences', required=False)
    preferred_work_format = serializers.ListField(source='profile.preferred_work_format', required=False)
    languages = serializers.CharField(source='profile.languages', required=False)
    devices = serializers.ListField(source='profile.devices', required=False)

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'email',
            'bio', 'skills', 'experience', 'linkedin', 'interests',
            'preferred_industries', 'education', 'employment', 'income',
            'is_single_parent', 'has_disability', 'accessibility_requirements',
            'opportunity_preferences', 'preferred_work_format', 'languages', 'devices'
        ]

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        profile, _ = Profile.objects.get_or_create(user=instance)
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()

        return instance
