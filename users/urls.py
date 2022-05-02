"""recroom URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from users import views

urlpatterns = [
    path('cadastrar/', views.create_user, name='create_user'),
    path('interesses/', views.get_save_interests, name='interests'),
    path('login/', views.login, name='login'),
    path('evaluate/', views.evaluate, name='evaluate'),
    path('valuations/', views.get_valuations, name='valuation'),
    path('logout/', views.logout, name='logout'),
    path('exp/', views.setup_experiment, name='exp'),
]

