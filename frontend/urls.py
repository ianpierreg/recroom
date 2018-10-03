from django.urls import path
from . import views

urlpatterns = [
    path('', views.listRooms),
    path('cadastro/', views.register),
    path('entrar/', views.login),
    path('adicionar-casa/', views.add_room),
]