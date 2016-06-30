# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-06-30 14:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0005_auto_20160630_1836'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='cover_art',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='album',
            name='has_cover',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='music',
            name='length',
            field=models.IntegerField(default=0),
        ),
    ]
