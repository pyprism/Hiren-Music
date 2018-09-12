from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Setting, B2Account


class BlackbazeSerializer(ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = B2Account
        fields = ('app_key', 'app_key_id')

