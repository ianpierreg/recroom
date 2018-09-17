from django.urls import path
from . import views

urlpatterns = [
    path('', views.listRooms),
    path('register/', views.register),
    path('entrar/', views.login),
]