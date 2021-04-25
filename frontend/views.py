from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED

# def listRooms(request):
#     return render(request, 'frontend/list_rooms.html')

def home(request):
    return render(request, 'frontend/home.html')