from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.text import slugify
from django.utils.crypto import get_random_string
import base64
import json

from ..models import User, Profile
from ..serializers.user_serializer import UserProfileSerializer


def decode_jwt(jwt_token):
    header, payload, signature = jwt_token.split('.')

    def base64url_decode(data):
        padding = '=' * (4 - len(data) % 4)
        return base64.urlsafe_b64decode(data + padding)

    decoded_payload = base64url_decode(payload)
    return json.loads(decoded_payload)


class GoogleTokenLoginSerializer(serializers.Serializer):
    access_token = serializers.CharField()

    def validate(self, attrs):
        token = attrs.get('access_token')

        try:
            payload = decode_jwt(token)

            if payload.get('iss') != 'https://accounts.google.com':
                raise serializers.ValidationError('Invalid token issuer')

            if not payload.get('email_verified'):
                raise serializers.ValidationError('Email not verified')

            email = payload['email']
            first_name = payload.get('given_name', '')
            last_name = payload.get('family_name', '')

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                base_username = slugify(email.split('@')[0])
                username = base_username
                while User.objects.filter(username=username).exists():
                    username = f"{base_username}_{get_random_string(4)}"

                user = User.objects.create(
                    email=email,
                    username=username,
                    first_name=first_name,
                    last_name=last_name
                )
                Profile.objects.create(user=user)

            Profile.objects.get_or_create(user=user)

            refresh = RefreshToken.for_user(user)

            return {
                "user": UserProfileSerializer(user).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }

        except Exception as e:
            raise serializers.ValidationError(f"Token decoding failed: {str(e)}")
