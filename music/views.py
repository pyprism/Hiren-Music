from rest_framework import generics
from .models import Music, Dropbox, Album
from .serializers import AlbumSerializer, DropboxSerializer, MusicSerializer


class AlbumList(generics.ListCreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


class AlbumDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    Create, retrieve, update or delete a instance
    """
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


class MusicDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    Create, retrieve, update or delete a instance
    """
    model = Music
    serializer_class = MusicSerializer


class DropboxDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    Create, retrieve, update or delete a instance
    """
    model = Dropbox
    serializer_class = DropboxSerializer
