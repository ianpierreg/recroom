# users/views.py
import random

from django.contrib.auth.models import Group
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED

from house.models import Room
from interest.models import Interest, InterestType
from interest.serializers import InterestSerializer
from users.models import Profile, ProfileInterests, Valuation
from users.serializers import CreateUserSerializer, ValuationSerializer

import ipdb


#


@csrf_exempt
@api_view(['POST'])
def get_save_interests(request):
    # import ipdb; ipdb.set_trace()
    token_header = request.META.get("HTTP_AUTHORIZATION")[7:][:-1]
    token = Token.objects.get(key=token_header)
    profile = Profile.objects.get(user_id=token.user_id)

    if(request.data['items']):
        interests = Interest.objects.filter(id__in=request.data['items'])
        profile.answered += len(request.data['items'])
        profile.save()
        for interest in interests:
            profile.interests.add(interest)
            profile_interest = ProfileInterests.objects.get(interest_id=interest.id, profile_id=profile.id)
            profile_interest.importance = request.data['importance']
            profile_interest.save()

    interests_buff = profile.interests.all().values_list("interest_type_id", flat=True)
    types_available = InterestType.objects.exclude(id__in = interests_buff)

    if types_available:
        interest_type = random.choice(types_available)
        interests = Interest.objects.filter(interest_type=interest_type)
        serializers = InterestSerializer(interests, many=True)
        return Response({"type": interest_type.name, "description": interest_type.description, "interests": serializers.data}, status=status.HTTP_200_OK)
    else:
        return Response({"status": "Ok", "msg": "As perguntas terminaram!"}, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['POST'])
def create_user(request):
    # ipdb.set_trace()
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

@csrf_exempt
@api_view(["POST"])
def logout(request):
    token_header = request.META.get("HTTP_AUTHORIZATION")[6:]
    token = Token.objects.filter(key=token_header)
    token.delete()
    return Response(status=status.HTTP_200_OK)

@csrf_exempt
@api_view(["POST"])
def evaluate(request):
    # ipdb.set_trace()
    token_header = request.META.get("HTTP_AUTHORIZATION")[7:][:-1]
    token = Token.objects.get(key=token_header)
    profile = Profile.objects.get(user_id=token.user_id)
    room = Room.objects.get(id=request.data.get("room_id"))

    valuation, created = Valuation.objects.update_or_create(room_id=room.id, profile_id=profile.id, defaults=request.data)

    return Response({"valuation": 1})

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
# class get_valuations(generics.ListCreateAPIView):
#     queryset = models.CustomUser.objects.all()
#     serializer_class = serializers.CreateUserSerializer


# @csrf_exempt
@api_view(['GET'])
def get_valuations(request):
    token_header = request.META.get("HTTP_AUTHORIZATION")[6:]
    token = Token.objects.get(key=token_header)
    profile = Profile.objects.get(user_id=token.user_id)

    valuations = Valuation.objects.filter(profile=profile)
    valuations_serialized = ValuationSerializer(valuations, many=True)

    return Response({"valuations": valuations_serialized.data}, status=status.HTTP_200_OK)
