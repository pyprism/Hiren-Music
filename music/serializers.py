from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Musician, Track, Album, Playlist


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
    musician = MusicianSerializer(many=True)
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )
    picture = serializers.ImageField(allow_null=True, write_only=True)
    picture_thumbnail = serializers.ImageField(read_only=True)

    class Meta:
        model = Album
        fields = '__all__'

    def create(self, validated_data):
        print("Asasass1asa5s4as4asassas24asa4s4a5sas")
        musician_data = validated_data.pop('musician')
        musician, created = Musician.objects.get_or_create(user=self.context['request'].user,
                                                           name=musician_data['name'])
        print(created)
        print(musician)
        album = Album.objects.create(musician=musician,  **validated_data)
        return album

    def update(self, instance, validated_data):
        print("updatesas5s4asas")
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

