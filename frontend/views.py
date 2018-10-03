from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED


def listRooms(request):
    return render(request, 'frontend/list_rooms.html')


def register(request):
    return render(request, 'frontend/register.html')


def login(request):
    return render(request, 'frontend/login.html')

def add_room(request):
    return render(request, 'frontend/add_room.html')