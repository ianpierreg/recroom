from django.contrib.auth.models import User
from django.db import models


class Address(models.Model):
    zipcode = models.CharField("CEP", null=False, blank=False, max_length=8)
    state = models.CharField("Estado", null=False, blank=False, max_length=2)
    city = models.CharField("Cidade", null=False, blank=False, max_length=150)
    neighborhood = models.CharField("Bairro", null=False, blank=False, max_length=350)
    street = models.CharField("Rua/Av/Tv", null=False, blank=False, max_length=300)
    number = models.IntegerField("Número", null=True, blank=True)
    complement = models.CharField("Complemento", null=True, blank=True, max_length=500)


class House(models.Model):
    rooms = models.IntegerField("Quantidade de quartos", null=False, blank=False)
    people = models.IntegerField("Quantidade de pessoas", null=False, blank=False)
    bathrooms = models.IntegerField("Quantidade de banheiros", null=False, blank=False)
    size = models.DecimalField("Tamanho(m²)", null=False, blank=False, max_digits=6, decimal_places=2)
    address = models.OneToOneField(Address, on_delete=models.CASCADE, null=False, blank=True)
    landlord = models.ForeignKey(User, null=False, blank=True, on_delete=models.CASCADE)


class Room(models.Model):
    tenant = models.OneToOneField(User, null=True, blank=True, on_delete=models.DO_NOTHING)
    description = models.CharField("Descrição", null=False, blank=False, max_length=40)
    size = models.DecimalField("Tamanho(m²)", null=True, blank=True, max_digits=6, decimal_places=2)
    house = models.ForeignKey(House, on_delete=models.CASCADE, null=False, blank=True)
    price = models.FloatField("Valor do aluguel", null=False, blank=False)


class Picture(models.Model):
    image = models.ImageField("Imagem", null=False, blank=False)
    description = models.CharField("Descrição", null=True, blank=True, max_length=100)
    house = models.ForeignKey(House, null=True, blank=True, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, null=True, blank=True, on_delete=models.CASCADE)


class Furniture(models.Model):
    name = models.CharField("Móvel/Eletrodoméstico", null=False, blank=False, max_length=30)
    description = models.CharField("Descrição/Observação", null=True, blank=True, max_length=300)
    house = models.ForeignKey(House, null=True, blank=True, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, null=True, blank=True, on_delete=models.CASCADE)


class Amenity(models.Model):
    name = models.CharField("Facilidade/Cortesia", null=False, blank=False, max_length=30)
    description = models.CharField("Descrição/Observação", null=True, blank=True, max_length=300)
    house = models.ForeignKey(House, null=False, blank=True, on_delete=models.CASCADE)
