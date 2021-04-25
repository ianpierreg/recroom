# users/models.py
from django.db import models
from django.contrib.auth.models import User

from interest.models import Interest


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    birthdate = models.DateField('Data de nascimento', null=False, blank=False)
    group = models.CharField('Grupo', max_length=11, null=False, blank=False)
    answered = models.IntegerField(null=False, blank=True, default=0)
    interests = models.ManyToManyField(Interest)

