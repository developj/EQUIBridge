import base64
import json
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from ..models.profile import Profile
from ..serializers.user_serializer import UserProfileSerializer

User = get_user_model()


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

            user, created = User.objects.get_or_create(email=email, defaults={
                'username': email.split('@')[0],
                'first_name': first_name,
                'last_name': last_name,
            })

            if created:
                Profile.objects.create(user=user)

            refresh = RefreshToken.for_user(user)

            return {
                "user": UserProfileSerializer(user).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }

        except Exception as e:
            raise serializers.ValidationError(f"Token decoding failed: {str(e)}")
