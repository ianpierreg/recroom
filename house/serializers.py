# house/serializers.py
from rest_framework import serializers

from house.models import Address, House, Picture, Room, Furniture, Amenity


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'


class PictureSerializer(serializers.ModelSerializer):

    class Meta:
        model = Picture
        fields = '__all__'


class FurnitureSerializer(serializers.ModelSerializer):

    class Meta:
        model = Furniture
        fields = '__all__'


class AmenitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Amenity
        fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    pictures = PictureSerializer(many=True)
    furnitures = FurnitureSerializer(many=True)

    class Meta:
        model = Room
        fields = '__all__'

    def create(self, validated_data):
        pictures = validated_data.pop('pictures')
        furnitures = validated_data.pop('furnitures')
        room = Room.objects.create(**validated_data)

        for picture in pictures:
            Picture.objects.create(room=room, **picture)

        for furniture in furnitures:
            Furniture.objects.create(room=room, **furniture)

        return room

class HouseSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    pictures = PictureSerializer(many=True)
    real_rooms = RoomSerializer(many=True)
    furnitures = FurnitureSerializer(many=True)
    amenities = AmenitySerializer(many=True)

    class Meta:
        model = House
        fields = '__all__'

    def create(self, validated_data):
        pictures = validated_data.pop('pictures')
        furnitures = validated_data.pop('furnitures')
        address = validated_data.pop('address')
        amenities = validated_data.pop('amenities')
        real_rooms = validated_data.pop('real_rooms')

        address_saved = Address.objects.create(**address)
        house = House.objects.create(address=address_saved, **validated_data)

        for picture in pictures:
            Picture.objects.create(house=house, **picture)

        for furniture in furnitures:
            Furniture.objects.create(house=house, **furniture)

        for amenity in amenities:
            Amenity.objects.create(house=house, **amenity)

        for room in real_rooms:
            room_serialized = RoomSerializer(data=room)
            if room_serialized.is_valid():
                room_serialized.save(house=house)

        return house