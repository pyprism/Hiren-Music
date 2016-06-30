from rest_framework import serializers
from .models import Album, Music, Playlist


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album


class MusicSerializer(serializers.ModelSerializer):
    file = serializers.FileField(read_only=True)

    class Meta:
        model = Music
        fields = ('id', 'favorite', 'created_at', 'file', 'counter', 'name', 'album', 'playlist', 'length')


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
