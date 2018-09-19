# interest/admin.py
from django.contrib import admin

from .models import InterestType, Interest

admin.site.register(InterestType)
admin.site.register(Interest)