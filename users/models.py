# users/models.py
from django.db import models
import django.db.models.deletion
from django.contrib.auth.models import User
from interest.models import Interest

class ProfileInterests(models.Model):
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE)
    interest = models.ForeignKey(Interest, on_delete=models.CASCADE)
    importance = models.IntegerField(null=False, blank=False, default=1)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    birthdate = models.DateField('Data de nascimento', null=False, blank=False)
    group = models.CharField('Grupo', max_length=11, null=False, blank=False)
    answered = models.IntegerField(null=False, blank=True, default=0)
    interests = models.ManyToManyField(Interest, through=ProfileInterests)