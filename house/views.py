# users/views.py
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, request, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from house.serializers import HouseSerializer
from . import models
from . import serializers


@csrf_exempt
@api_view(['POST'])
def create_house(request):
    token_header = request.META.get("HTTP_AUTHORIZATION")[6:]
    token = Token.objects.get(key=token_header)
    user = User.objects.get(id=token.user_id)
    house = HouseSerializer(data=request.data)

    if house.is_valid():
        house.save(landlord=user)
        return Response({'status':'ok'}, status=status.HTTP_201_CREATED)
    else:
        return Response(house._errors, status=status.HTTP_400_BAD_REQUEST)

class RoomListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer