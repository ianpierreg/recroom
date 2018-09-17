# users/views.py
from django.contrib.auth.models import Group
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt

from rest_framework import generics, status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED

from users.serializers import CreateProfileSerializer, CreateUserSerializer
from . import models
from . import serializers


@csrf_exempt
@api_view(['POST'])
def create_user(request):
    user = CreateUserSerializer(data=request.data)
    if user.is_valid():
        profile_group = Group.objects.get(name=user.validated_data['profile']['group'])
        user_saved = user.save()
        profile_group.user_set.add(user_saved)
        user_auth = authenticate(username=user.validated_data['email'], password=user.validated_data['password'])
        token, _ = Token.objects.get_or_create(user=user_auth)
        return Response({'user': user.data, 'token': token.key}, status=status.HTTP_201_CREATED)
    else:
        return Response(user._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    username = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if not user:
        return Response({"error": "Login failed"}, status=HTTP_401_UNAUTHORIZED)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key})


@api_view(["POST"])
def logout(request):
    token_header = request.META.get("HTTP_AUTHORIZATION")[6:]
    token = Token.objects.filter(key=token_header)
    token.delete()
    return Response(status=status.HTTP_200_OK)

# @login_required
# def update_user(request):
#     profile_form = UpdateProfileForm(request.POST or None, instance=request.user.profile)
#     if profile_form.is_valid():
#         profile_form.save()
#         return redirect('core:home')
#     return render(request, 'accounts/create_update_profile.html', {
#         'profile_form': profile_form,
#         'form_title': "Dados Cadastrais",
#         'form_button': "Atualizar"
#     })
#
#
# class UserListView(generics.ListCreateAPIView):
#     queryset = models.CustomUser.objects.all()
#     serializer_class = serializers.CreateUserSerializer


