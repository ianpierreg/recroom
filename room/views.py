# users/views.py
from requests import Response
from rest_framework import generics, request
from rest_framework.permissions import IsAuthenticated

from . import models
from . import serializers


class RoomListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer