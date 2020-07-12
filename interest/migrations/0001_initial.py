# Generated by Django 2.0.7 on 2018-09-19 18:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Tipo de interesse')),
                ('description', models.CharField(blank=True, max_length=400, null=True, verbose_name='Descrição do interesse')),
            ],
            options={
                'verbose_name': 'Interesse',
            },
        ),
        migrations.CreateModel(
            name='InterestType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Tipo de interesse')),
                ('description', models.CharField(blank=True, max_length=400, null=True, verbose_name='Descrição do interesse')),
            ],
            options={
                'verbose_name': 'Tipo de interesse',
            },
        ),
        migrations.AddField(
            model_name='interest',
            name='interest_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='interest.InterestType'),
        ),
    ]