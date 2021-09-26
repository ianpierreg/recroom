from django.db import models


class InterestType(models.Model):
    name = models.CharField("Tipo de interesse", max_length=100, null=False, blank=False)
    description = models.CharField("Descrição do tipo de interesse", max_length=400, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Tipo de interesse"

class Interest(models.Model):
    name = models.CharField("Interesse", max_length=10000, null=False, blank=False)
    description = models.CharField("Descrição do interesse", max_length=400, null=True, blank=True)
    interest_type = models.ForeignKey(InterestType, on_delete=models.CASCADE)
    # profiles = models.ManyToManyField(Profile, through='ProfileInterests')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Interesse"

