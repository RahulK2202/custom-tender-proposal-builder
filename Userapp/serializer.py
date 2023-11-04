from rest_framework import serializers
from Userapp.models import AppUsers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=AppUsers
        fields = ("id", "username", "email", "password","phone_number")
        extra_kwargs = {"password": {"write_only": True}}
    def create(self, validated_data):
        return AppUsers.objects.create_user(**validated_data)
    

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        fields=("email","password")

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        print("inside the serializer")
        
            
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['phone_number'] = user.phone_number
        token['is_active'] = user.is_active
        token['is_superuser'] = user.is_superuser
        token['is_staff'] = user.is_staff
        return token