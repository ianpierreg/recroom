# users/views.py
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, request, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from house.services import CosineCalculator
import ipdb

from house.serializers import HouseSerializer
from house.serializers import RoomSerializer
from users.models import Profile
from . import models
from . import serializers
from .models import House, Room


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

# @api_view(['GET'])
# def get_rooms(request):
#     token_header = request.META.get("HTTP_AUTHORIZATION")[6:]
#     # import ipdb;
#     # ipdb.set_trace()
#     try:
#         token = Token.objects.get(key=token_header)
#     except Token.DoesNotExist:
#         return Response({"status": "Nao autenticado", "load": 0}, status=status.HTTP_200_OK)
#
#
#     rooms = models.Room.objects.all()
#     serializers_room = RoomSerializer(rooms, many=True)
#     return Response({"rooms": serializers_room.data}, status=status.HTTP_200_OK)
#

# @csrf_exempt
@api_view(['GET'])
def get_rooms(request):
    # ipdb.set_trace()

    token_header = request.META.get("HTTP_AUTHORIZATION")[6:]
    token = Token.objects.get(key=token_header)
    profile = Profile.objects.get(user_id=token.user_id)

    cosine = CosineCalculator()
    houses = House.objects.all()
    future_tenant = Profile.objects.get(user_id=token.user_id)
    if future_tenant.answered == 0:
        return Response({"msg": 'Por gentileza, complete seu perfil para ter acesso ao ranking de quartos.'}, status=status.HTTP_200_OK)

    houses = cosine.calculate_similarity_all_houses(houses, future_tenant, profile)
    rooms = []
    # ipdb.set_trace()

    for house in houses:
        rooms_buffer = Room.objects.filter(house=house, tenant__isnull=True).all()
        for room_buffer in rooms_buffer:
            room_serializer = serializers.RoomSerializer(room_buffer)
            # ipdb.set_trace()
            # if room_serializer.tenant is not None: continue
            new_room = {
                "value": house.value,
                "tenants_interests": house.tenants_interests,
                "future_tenant_interests": house.interests_future_tenant
            }
            new_room.update(room_serializer.data)
            rooms.append(new_room)

    return Response({"rooms": rooms}, status=status.HTTP_200_OK)