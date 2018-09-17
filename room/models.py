from django.contrib.auth.models import User
from django.db import models


class Room(models.Model):
    landlord = models.ForeignKey(User, null=False, blank=True, on_delete=models.DO_NOTHING, related_name="+")
    tenant = models.OneToOneField(User, null=True, blank=True, on_delete=models.DO_NOTHING)
    width = models.IntegerField("Largura", null=False, blank=False)
    description = models.CharField("Descrição", null=False, blank=False, max_length=40)
    length = models.IntegerField("Comprimento", null=False, blank=False)
    price = models.FloatField("Valor do aluguel", null=False, blank=False)
    picture_1 = models.ImageField("Primeira foto", null=False, blank=False)
    picture_2 = models.ImageField("Segunda foto", null=True, blank=True)
    picture_3 = models.ImageField("Terceira foto", null=True, blank=True)

    def __str__(self):
        return self.description

    class Meta:
        verbose_name = 'Quarto'
        verbose_name_plural = 'Quartos'



