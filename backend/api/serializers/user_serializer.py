from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models.profile import Profile

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    # Read-only email from User model
    email = serializers.EmailField(read_only=True)

    # Profile fields (optional)
    bio = serializers.CharField(source='profile.bio', required=False, allow_blank=True, allow_null=True)
    skills = serializers.ListField(source='profile.skills', required=False, allow_null=True)
    experience = serializers.CharField(source='profile.experience', required=False, allow_blank=True, allow_null=True)
    linkedin = serializers.CharField(source='profile.linkedin', required=False, allow_blank=True, allow_null=True)
    interests = serializers.CharField(source='profile.interests', required=False, allow_blank=True, allow_null=True)
    preferred_industries = serializers.CharField(source='profile.preferred_industries', required=False, allow_blank=True, allow_null=True)
    education = serializers.CharField(source='profile.education', required=False, allow_blank=True, allow_null=True)
    employment = serializers.CharField(source='profile.employment', required=False, allow_blank=True, allow_null=True)
    is_single_parent = serializers.BooleanField(source='profile.is_single_parent', required=False)
    has_disability = serializers.BooleanField(source='profile.has_disability', required=False)
    accessibility_requirements = serializers.CharField(source='profile.accessibility_requirements', required=False, allow_blank=True, allow_null=True)
    languages = serializers.CharField(source='profile.languages', required=False, allow_blank=True, allow_null=True)
    devices = serializers.ListField(source='profile.devices', required=False, allow_null=True)
    interest_search_phrase = serializers.CharField(source='profile.interest_search_phrase', required=False, allow_blank=True, allow_null=True)


    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'email',
            'bio', 'skills', 'experience', 'linkedin', 'interests',
            'preferred_industries', 'education', 'employment',
            'is_single_parent', 'has_disability', 'accessibility_requirements',
            'languages', 'devices', 'interest_search_phrase',
        ]

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})

        # Email is read-only and will be excluded automatically
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        profile, _ = Profile.objects.get_or_create(user=instance)
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()

        return instance
