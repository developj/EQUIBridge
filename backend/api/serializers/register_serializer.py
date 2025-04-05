from rest_framework import serializers
from api.models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'middle_name',
            'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'middle_name': {'required': False},
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
