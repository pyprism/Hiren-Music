from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Musician, Track, Album, Playlist


class MusicianSerializer(ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )
    picture_thumbnail = serializers.ImageField()

    class Meta:
        model = Musician
        exclude = ('picture', )
        read_only_fields = ('picture_thumbnail',)


class AlbumSerializer(ModelSerializer):
    musician = MusicianSerializer(many=True)
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )
    picture_thumbnail = serializers.ImageField()

    class Meta:
        model = Album
        exclude = ('picture',)
        read_only_fields = ('picture_thumbnail',)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class TrackSerializer(ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )
    album = AlbumSerializer(many=True)
    musician = MusicianSerializer(many=True)

    class Meta:
        model = Track
        fields = '__all__'


class PlaylistSerializer(ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )
    album = AlbumSerializer(many=True)
    musician = MusicianSerializer(many=True)
    track = TrackSerializer(many=True)

    class Meta:
        model = Playlist
        fields = '__all__'

