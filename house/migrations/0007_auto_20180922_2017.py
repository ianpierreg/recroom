# Generated by Django 2.0.7 on 2018-09-22 20:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('house', '0006_auto_20180922_2014'),
    ]

    operations = [
        migrations.AlterField(
            model_name='house',
            name='landlord',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='landlord', to=settings.AUTH_USER_MODEL),
        ),
    ]
