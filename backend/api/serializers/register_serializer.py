from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .user_serializer import UserSerializer

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
        return User.objects.create_user(**validated_data)

    def to_representation(self, instance):
        tokens = RefreshToken.for_user(instance)
        return {
            "user": UserSerializer(instance).data,
            "refresh": str(tokens),
            "access": str(tokens.access_token),
        }