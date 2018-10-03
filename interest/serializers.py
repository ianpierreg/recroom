# users/serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers

from interest.models import Interest


class InterestSerializer(serializers.ModelSerializer):

    class Meta:
        model = Interest
        fields = '__all__'

