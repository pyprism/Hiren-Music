from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Album, Music, Playlist
from .serializers import AlbumSerializer, PlaylistSerializer, MusicSerializer
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework import status
from hiren.settings import JSON_DATA
from braces.views import CsrfExemptMixin
import dropbox


class AlbumViewSet(CsrfExemptMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows album to be created, viewed ,edited and deleted.
    """
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


class PlaylistViewSet(CsrfExemptMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows playlist to be created, viewed ,edited and deleted.
    """
    queryset = Playlist.objects.all().order_by('-created_at')
    serializer_class = PlaylistSerializer


class MusicViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows music files and related info to be created, viewed ,edited and deleted.
    """
    queryset = Music.objects.all()
    serializer_class = MusicSerializer

    def perform_create(self, serializer):
        file_obj = self.request.data['file']
        print('hot')
        dbx = dropbox.Dropbox(JSON_DATA['dropbox_access_token'])
        res = dbx.files_upload(file_obj, '/', autorename=True, mute=True)
        print(res)
        #serializer.save(dropbox_id='x')
