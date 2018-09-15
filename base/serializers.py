from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Setting, B2Account


class BlackbazeSerializer(ModelSerializer):
    verification = serializers.NullBooleanField()

    class Meta:
        model = B2Account
        fields = ('id', 'app_key', 'app_key_id', 'upload', 'verification')
        read_only_fields = ('verification', )


class SettingsSerializer(ModelSerializer):

    class Meta:
        model = Setting
        fields = ('active', )

