# users/serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers

from users.models import Profile, Valuation
from . import models

class ValuationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Valuation
        fields = '__all__'

class CreateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('birthdate', 'group')

class CreateUserSerializer(serializers.ModelSerializer):
    profile = CreateProfileSerializer()

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username= validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        Profile.objects.create(user=user, **profile_data)
        return user
