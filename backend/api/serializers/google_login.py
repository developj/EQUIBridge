from dj_rest_auth.registration.serializers import SocialLoginSerializer
from rest_framework import serializers

class GoogleLoginSerializer(SocialLoginSerializer):
    access_token = serializers.CharField(required=True)

    class Meta:
        fields = ['auth_token']
