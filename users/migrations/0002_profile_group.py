# Generated by Django 2.0.7 on 2018-09-16 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='group',
            field=models.CharField(default='tenant', max_length=11, verbose_name='Grupo'),
            preserve_default=False,
        ),
    ]
