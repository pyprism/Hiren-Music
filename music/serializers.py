from rest_framework import serializers
from .models import Album, Music, Playlist


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album


class MusicSerializer(serializers.ModelSerializer):
    file = serializers.FileField(required=True)

    class Meta:
        model = Music
        fields = ('id', 'favorite', 'created_at', 'counter', 'file', 'name', 'album', 'playlist')


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
