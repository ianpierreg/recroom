# users/views.py
import random
import math
from django.contrib.auth.models import User

from django.contrib.auth.models import Group
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED

from house.models import Room, House, Address
from interest.models import Interest, InterestType
from interest.serializers import InterestSerializer
from users.models import Profile, ProfileInterests, Valuation
from users.serializers import CreateUserSerializer, ValuationSerializer
from house.services import CosineCalculator

import ipdb


#


@csrf_exempt
@api_view(['POST'])
def get_save_interests(request):
    # import ipdb; ipdb.set_trace()
    # ipdb.set_trace()
    token_header = request.META.get("HTTP_AUTHORIZATION")[7:][:-1]
    token = Token.objects.get(key=token_header)
    profile = Profile.objects.get(user_id=token.user_id)

    if(request.data['items']):
        interests = Interest.objects.filter(id__in=request.data['items'])
        profile.answered += len(request.data['items'])
        profile.save()
        for interest in interests:
            profile.interests.add(interest)
            profile_interest = ProfileInterests.objects.get(
                interest_id=interest.id, profile_id=profile.id)
            profile_interest.importance = request.data['importance']
            profile_interest.save()

    interests_buff = profile.interests.all().values_list("interest_type_id", flat=True)
    types_available = InterestType.objects.exclude(id__in=interests_buff)

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
        profile_group = Group.objects.get(
            name=user.validated_data['profile']['group'])
        user_saved = user.save()
        profile_group.user_set.add(user_saved)
        user_auth = authenticate(
            username=user.validated_data['email'], password=user.validated_data['password'])
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

    valuation, created = Valuation.objects.update_or_create(
        room_id=room.id, profile_id=profile.id, defaults=request.data)

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


def assign_random_interests_to_users(user):
    types = InterestType.objects.all()
    for itype in types:
        interests_by_type = Interest.objects.filter(interest_type=itype)
        list_size = len(interests_by_type)
        sample_max_size = 1
        sample_min_size = 1

        if (list_size < 5):
            sample_max_size = max(1, list_size-1)
        else:
            sample_max_size = math.ceil(list_size/1.7)
            sample_min_size = math.ceil(list_size/2.7)

        if (itype.name == 'Religião'):
            sample_max_size = 1
            sample_min_size = 1

        sample_size = random.choice(range(sample_min_size, sample_max_size+1))
        interests = Interest.objects.filter(
            interest_type=itype).order_by('?')[:sample_size]

        if itype.id == 4:
          # ipdb.set_trace()
          interests = Interest.objects.filter(pk__in=random.choice(
              [[25, 26, 27], [30, 31, 32], [33, 34, 35]]))
          interests = random.sample(list(interests), 2)

        if itype.id == 17:
          interests = Interest.objects.filter(pk__in=random.choice(
              [[53, 156], [52, 155]]))

        if itype.id == 16:
          interests = Interest.objects.filter(pk__in=random.choice(
              [[49, 50], [51, 54]]))
          interests = random.sample(list(interests), random.choice(range(1, 3)))

        if itype.id == 14:
          interests = Interest.objects.filter(pk__in=random.choice(
              [[43, 44], [42, 158]]))
          interests = random.sample(list(interests), random.choice(range(1, 3)))

        if itype.id == 20:
          interests = Interest.objects.filter(pk__in=random.choice(
              [[76, 77, 79], [74, 75]]))
          interests = random.sample(list(interests), 2)

        if itype.id == 22:
          interests = Interest.objects.filter(pk__in=random.choice(
              [[88, 91, 89], [97, 95, 93, 98]]))
          interests = random.sample(list(interests), len(interests)-1)

        if itype.id == 18:
            interests = Interest.objects.filter(pk__in=random.choice(
              [[62, 63], [56, 59, 55]]))
            interests = random.sample(list(interests), 2)

        if itype.id == 15:
          interests = Interest.objects.filter(pk__in=random.choice(
              [[46, 48], [47, 159]]))

        if itype.id == 19:
          interests = Interest.objects.filter(pk__in=random.choice(
              [[65, 66, 67], [69, 70]]))
          interests = random.sample(list(interests), 2)

        for interest in interests:
            user.profile.interests.add(interest)
            user.profile.answered += 1
            user.profile.save()

            profile_interest = ProfileInterests.objects.get(
                interest_id=interest.id, profile_id=user.profile.id)
            profile_interest.importance = random.choice(range(1, 6))

            if itype.name in [
                "Religião",
                "Preferências Musicais",
                "Ética Social",
                "Preferências Cinematográficas",
                "Preferências de tempo livro e Hobbies",
            ]:
                profile_interest.importance = random.choice(range(3, 6))

            profile_interest.save()

# def willBeSeed():
# @csrf_exempt
# @api_view(['POST'])


def setup_experiment(request):
    # create 20 landlords

    createLandlorsAndHouses()
    createTenantsAndRooms()


def createLandlorsAndHouses():
    for i in range(20):
        user_data = {
            'email': 'virtual_landlord'+str(i)+'@gmail.com',
            'first_name': 'Virtual L'+str(i),
            'last_name': 'Landlord '+str(i),
            'password': '281094',
            'profile': {'birthdate': '1994-01-01', 'group': 'landlord'}
        }

        user = CreateUserSerializer(data=user_data)
        if user.is_valid():
            profile_group = Group.objects.get(
                name=user.validated_data['profile']['group'])
            user_saved = user.save()
            address = Address(
                zipcode='222-2222',
                state='BA',
                city='Salvador',
                neighborhood='Pituba',
                street='Rua das Flores',
                number=2,
            )
            address.save()

            house = House(
                rooms=2,
                people=1,
                bathrooms=3,
                size=200,
                landlord=user_saved,
                address_id=address.id
            )
            house.save()

            room = Room(
                description='Quarto Exp',
                size=10,
                house=house,
                price=600
            )
            room.save()

            profile_group.user_set.add(user_saved)
            assign_random_interests_to_users(user_saved)


def createTenantsAndRooms():
    for i in range(55):
        user_data = {
            'email': 'virtual_tenant'+str(i)+'@gmail.com',
            'first_name': 'Virtual T'+str(i),
            'last_name': 'Tenant '+str(i),
            'password': '281094',
            'profile': {'birthdate': '1994-01-01', 'group': 'tenant'}
        }

        user = CreateUserSerializer(data=user_data)

        if user.is_valid():
            profile_group = Group.objects.get(
                name=user.validated_data['profile']['group'])
            user_saved = user.save()
            profile_group.user_set.add(user_saved)
            assign_random_interests_to_users(user_saved)
            houses = House.objects.all()
            cosine = CosineCalculator()
            # ipdb.set_trace()
            houses = cosine.calculate_similarity_all_houses(
                houses, user_saved.profile, user_saved.profile)

            chosen_house = houses[0]
            exclude_len = len(Room.objects.filter(house=chosen_house))

            for house in houses:
                if len(Room.objects.filter(house=house)) < 4:
                    chosen_house = house
                    break

            print(chosen_house.value)
            room = Room(
                tenant=user_saved,
                description='Quarto virtual tenant',
                size=10,
                house=chosen_house,
                price=600
            )
            room.save()
            # rankear
            #   se a primeira opcao tem mais de 2 pessoas
            #   tentta a segunda
            #   e por ai vai
            # update Room com id do tenant

    # different function

    # ii = Interest.objects.group_by('interest_type')


# pegar interest type todos
# iterar em cima desse interest type
# pegar o numero de interesses e randomizar de 1 ao length
# randomizar importancia
