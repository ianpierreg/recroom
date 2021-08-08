import math
from array import array
import numpy
from sklearn.metrics.pairwise import cosine_similarity
import ipdb

from house.models import House, Room
from users.models import Profile, ProfileInterests
import logging
from django.contrib.auth.models import User

from interest.models import Interest
from interest.models import InterestType


class CosineCalculator:
    def calculate_similarity_all_houses(self, houses, future_tenant, profile):
        similarity_by_house = []

        for house in houses:
            house.value = self.calculate_similarity_house_tenant(house, future_tenant, profile)
            similarity_by_house.append(house)

        return sorted(similarity_by_house, key=lambda x: x.value, reverse=True)

    def calculate_similarity_house_tenant(self, house, future_tenant, profile):
        comparated_value = 0
        similarity = 0
        values_for_attributes = []
        tenants_interests = []

        interests_future_tenant = self.get_user_interests(future_tenant)
        interests_future_tenant_boolean = []

        aux = []
        tenants = []
        tenants.append(Profile.objects.get(user=house.landlord))
        rooms = Room.objects.filter(house=house)

        for room in rooms:
            if room.tenant is not None:
                tenants.append(room.tenant.profile)

        for tenant in tenants:
            tenants_interests.append(self.get_user_interests(tenant))

        interest_types = InterestType.objects.all()

        tenants_interests_boolean = [[]] * len(tenants)
        for interest_type in interest_types:
            interests_future_tenant_boolean += self.get_boolean_list(interests_future_tenant.get(interest_type.name),
                                                                     interest_type.name,
                                                                     profile)
            for i, tenant_interests in enumerate(tenants_interests):
                # ipdb.set_trace()
                tenants_interests_boolean[i] = tenants_interests_boolean[i] + self.get_boolean_list(tenant_interests.get(interest_type.name),
                                                                      interest_type.name,
                                                                      profile)

        similarity = 0

        for tenant_interests_boolean in tenants_interests_boolean:
            similariy_buffer = self.get_similarity(interests_future_tenant_boolean, tenant_interests_boolean)
            # ipdb.set_trace()
            similarity += similariy_buffer

        tenants_num = len(tenants)
        if tenants_num == 0:
            return tenants_num
        else:
            return similarity / len(tenants)

        # for key_future, interest_future_tenant in interests_future_tenant.items():
        #     for tenant in tenants:
        #         comparated_value += similarity
        #         similarity = 0
        #         tenant_interests = self.get_user_interests(tenant)
        #         for key_tenant, tenant_interest in tenant_interests.items():
        #             if key_future == key_tenant:
        #                 similarity = self.get_similarity(self.get_boolean_list(interests_future_tenant.get(key_future), key_future),
        #                                                  self.get_boolean_list(tenant_interests.get(key_future), key_future))
        #
        #                 aux.append(numpy.array(self.get_boolean_list(tenant_interests.get(key_future), key_future)))
        #
        #     if comparated_value > 0:
        #         attribute_value = comparated_value / len(tenants)
        #         if len(aux) > 0:
        #             future_tenant = self.get_boolean_list(interests_future_tenant.get(key_future), key_future)
        #             aux2 = numpy.vstack(aux)
        #             similarity2 = cosine_similarity(numpy.array(future_tenant).reshape(1, -1), aux2)
        #             print("#must be true#")
        #             sklearn_cosine_similarity = self.attributes_media_array(similarity2, len(tenants))
        #             print(round(attribute_value, 4) == round(sklearn_cosine_similarity, 4))
        #         values_for_attributes.append(attribute_value)
        #
        #         comparated_value = 0
        # return self.attributes_media(values_for_attributes)

    def get_user_interests(self, tenant):
        interests_tenant = {}
        interests_without_type = tenant.interests.all()
        for interest_without_type in interests_without_type:
            type_interest = interest_without_type.interest_type.name
            if type_interest not in interests_tenant:
                profile_interest = ProfileInterests.objects.get(interest_id=interest_without_type.id, profile_id=tenant.id)
                interests_tenant[type_interest] = {
                    'importance': profile_interest.importance,
                    'interests': [interest_without_type.name]
                }
            else:
                interests_tenant[type_interest]['interests'].append(interest_without_type.name)

        return interests_tenant

    def attributes_media(self, values_for_attributes):
        attributes_media = 0
        for value in values_for_attributes:
            attributes_media += value
        try:
            return attributes_media / len(values_for_attributes)
        except ZeroDivisionError:
            return 0

    def attributes_media_array(self, values_for_attributes, n_indexes):
        attributes_media = 0
        if values_for_attributes.size > 0:
            for value in values_for_attributes[0]:
                attributes_media += value
            try:
                return attributes_media / n_indexes
            except ZeroDivisionError:
                return 0

    def get_similarity(self, future_tenant_interests, tenant_interests):
        count = 0
        count_2 = 0
        future_1 = 0
        for future_tenant_interest, tenant_interest in zip(future_tenant_interests, tenant_interests):
            count += tenant_interest * future_tenant_interest
            count_2 += tenant_interest * tenant_interest
            future_1 += future_tenant_interest * future_tenant_interest
        try:
            return count / ((math.sqrt(count_2)) * (math.sqrt(future_1)))
        except ZeroDivisionError:
            return 0

    def get_boolean_list(self, user_interests, interest_type, profile):
        attributes_x_type = []

        interests_by_type = Interest.objects.filter(interest_type__name=interest_type).order_by('name')
        for interest_by_type in interests_by_type:
            # found = False
            value = 0
            for user_interest in user_interests['interests']:
                if interest_by_type.name == user_interest:
                    # found = True
                    value = user_interests['importance']
                    break
            # if found:
            attributes_x_type.append(value)
            # else:
            #     attributes_x_type.append(0)
        # ipdb.set_trace()
        return attributes_x_type
