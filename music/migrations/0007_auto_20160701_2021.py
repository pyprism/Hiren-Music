# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-01 14:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0006_auto_20160630_2050'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='offline',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='music',
            name='offline',
            field=models.BooleanField(default=False),
        ),
    ]