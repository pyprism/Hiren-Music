from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Musician, Track, Album, Playlist
from utils.b2 import upload_track


class MusicianSerializer(ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )
    picture = serializers.ImageField(allow_null=True, write_only=True)
    picture_thumbnail = serializers.ImageField(read_only=True)

    class Meta:
        model = Musician
        fields = '__all__'


class AlbumSerializer(ModelSerializer):
    musician = MusicianSerializer()
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )
    picture = serializers.ImageField(allow_null=True, write_only=True)
    picture_thumbnail = serializers.ImageField(read_only=True)

    class Meta:
        model = Album
        fields = '__all__'

    def create(self, validated_data):
        musician_data = validated_data.pop('musician')
        musician, created = Musician.objects.get_or_create(user=self.context['request'].user,
                                                           name=musician_data['name'])
        album = Album.objects.create(musician=musician,  **validated_data)
        return album

    def update(self, instance, validated_data):
        pass


class TrackSerializer(ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )
    album = AlbumSerializer()
    musician = MusicianSerializer(read_only=True)
    upload = serializers.FileField(allow_null=True)
    download = serializers.FileField(allow_null=True, read_only=True)
    b2_file_id = serializers.CharField(read_only=True)

    class Meta:
        model = Track
        fields = '__all__'

    def create(self, validated_data):
        album_data = validated_data.pop('album')
        musician_data = album_data['musician']['name']
        musician, created = Musician.objects.get_or_create(user=self.context['request'].user,
                                                           name=musician_data)
        album, created = Album.objects.get_or_create(user=self.context['request'].user,
                                                     name=album_data['name'], musician=musician)
        track = Track.objects.create(album=album, musician=musician, **validated_data)
        upload_track(self.context['request'].user)
        return track


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

