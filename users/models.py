# users/models.py
from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    birthdate = models.DateField('Data de nascimento', null=False, blank=False)
    cellphone = models.CharField('Número do celular', null=True, blank=True, max_length=11)
    cpf = models.CharField('CPF', max_length=11, null=False, blank=False)
    group = models.CharField('Grupo', max_length=11, null=False, blank=False)
    # house = models.OneToOneField(House, null=True, blank=True, on_delete=models.DO_NOTHING)

