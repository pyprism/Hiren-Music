from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Setting, B2Account
from utils.storage import check_storage


class BlackbazeSerializer(ModelSerializer):
    verification = serializers.NullBooleanField()
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )

    class Meta:
        model = B2Account
        fields = ('id', 'app_key', 'app_key_id', 'upload', 'verification', 'user')
        read_only_fields = ('verification', )


class SettingsSerializer(ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )

    class Meta:
        model = Setting
        fields = ('active', 'user')


class StorageSerializer(serializers.Serializer):
    base = serializers.JSONField()
