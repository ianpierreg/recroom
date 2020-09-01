# users/views.py
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, request, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from house.models import House, Room
from house.serializers import HouseSerializer
from house.services import CosineCalculator
from users.models import Profile
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


@csrf_exempt
@api_view(['GET'])
def rooms(request):
    token_header = request.META.get("HTTP_AUTHORIZATION")[6:]
    token = Token.objects.get(key=token_header)
    cosine = CosineCalculator()
    houses = House.objects.all()
    future_tenant = Profile.objects.get(user_id=token.user_id)
    houses = cosine.calculate_similarity_all_houses(houses, future_tenant)
    rooms = {}
    for house in houses:
        rooms_buffer = Room.objects.filter(house = house).all()
        for room_buffer in rooms_buffer:
            room_serializer = serializers.RoomSerializer(room_buffer)
            if house.value not in rooms.keys():
                rooms[house.value] = [room_serializer.data]
            else:
                rooms[house.value].append(room_serializer.data)

    return Response({"rooms": rooms}, status=status.HTTP_200_OK)