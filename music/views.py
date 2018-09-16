from django.shortcuts import render
from .serializers import TrackSerializer, AlbumSerializer, MusicianSerializer, PlaylistSerializer
from .models import Musician, Track, Album, Playlist
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication


class MusicianViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication, BasicAuthentication, SessionAuthentication)
    serializer_class = MusicianSerializer
    queryset = Musician.objects.all()


class AlbumViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication, BasicAuthentication, SessionAuthentication)
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()


class TrackViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication, BasicAuthentication, SessionAuthentication)
    serializer_class = TrackSerializer
    queryset = Track.objects.all()


class PlaylistViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication, BasicAuthentication, SessionAuthentication)
    serializer_class = PlaylistSerializer
    queryset = Playlist.objects.all()



