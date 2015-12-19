from rest_framework import serializers
from .models import Album, Dropbox, Music


class AlbumSerializer(serializers.ModelSerializer):

    class Meta:
        model = Album
        fields = ('id', 'name')


class MusicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Music
        fields = ('id', 'album', 'name', 'favorite')


class DropboxSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dropbox
        fields = '__all__'
