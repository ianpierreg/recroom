from django.urls import path
from . import views

urlpatterns = [
    # path('adicionar-casa/', views.listRooms),
    path('', views.home),
    path('instrucoes/', views.instructions)
]