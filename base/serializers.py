from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Setting, B2Account


class BlackbazeSerializer(ModelSerializer):

    class Meta:
        model = B2Account
        fields = ('app_key', 'app_key_id', 'upload')

