from rest_framework import serializers
from .models import Album, Music, Playlist


class AlbumSerializer(serializers.ModelSerializer):

    class Meta:
        model = Album


class MusicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Music


class PlaylistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Playlist
