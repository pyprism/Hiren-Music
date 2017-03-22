from rest_framework import serializers
from .models import Album, Music, Playlist, B2Account
from music.utils import b2


class AlbumSerializer(serializers.ModelSerializer):
    file = serializers.FileField(read_only=True)
    created_at = serializers.DateField(read_only=True)
    has_cover = serializers.BooleanField(read_only=True)

    class Meta:
        model = Album
        fields = ('id', 'name', 'has_cover', 'file', 'favorite', 'created_at', 'offline')


class MusicSerializer(serializers.ModelSerializer):
    file = serializers.FileField(read_only=True)
    created_at = serializers.DateField(read_only=True)
    counter = serializers.IntegerField(read_only=True)
    length = serializers.IntegerField(read_only=True)

    class Meta:
        model = Music
        fields = ('id', 'favorite', 'created_at', 'file', 'counter', 'name', 'album', 'playlist', 'length')


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'


class B2AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = B2Account
        fields = ('id', 'bucket_id', 'bucket_dir')

    def create(self, validated_data):
        b2.auth()  # first generate row then save bucket information
        obj = B2Account.objects.first().update(**validated_data)
        return obj
