from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .user_serializer import UserProfileSerializer
from ..models.profile import Profile

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'middle_name', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'middle_name': {'required': False}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user)  # ✅ Create an empty profile
        return user

    def to_representation(self, instance):
        tokens = RefreshToken.for_user(instance)
        return {
            "user": UserProfileSerializer(instance).data,
            "refresh": str(tokens),
            "access": str(tokens.access_token),
        }
