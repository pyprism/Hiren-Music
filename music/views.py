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
from rest_framework.parsers import FileUploadParser, FormParser, MultiPartParser
from .auth import CsrfExemptSessionAuthentication
import mutagen
import dropbox


class AlbumViewSet(CsrfExemptMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows album to be created, viewed ,edited and deleted.
    """
    authentication_classes = (CsrfExemptSessionAuthentication, JSONWebTokenAuthentication)
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    parser_classes = (FormParser, MultiPartParser)

    def perform_create(self, serializer):
        if len(self.request.FILES) != 0:
            file_obj = self.request.FILES['file']
            dbx = dropbox.Dropbox(JSON_DATA['dropbox_access_token'])
            res = dbx.files_upload(file_obj, '/' + self.request.FILES['file'].name, autorename=True, mute=True)
            serializer.save(cover_art=res.id, has_cover=True)
        else:
            serializer.save()


class PlaylistViewSet(CsrfExemptMixin, viewsets.ModelViewSet):
    """D
    API endpoint that allows playlist to be created, viewed ,edited and deleted.
    """
    queryset = Playlist.objects.all().order_by('-created_at')
    serializer_class = PlaylistSerializer


class MusicViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows music files and related info to be created, viewed ,edited and deleted.
    """
    authentication_classes = (CsrfExemptSessionAuthentication, JSONWebTokenAuthentication)
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    parser_classes = (FormParser, MultiPartParser)

    def perform_create(self, serializer):
        file_obj = self.request.FILES['file']  # maybe memory hogging
        info = mutagen.File(file_obj)
        dbx = dropbox.Dropbox(JSON_DATA['dropbox_access_token'])
        res = dbx.files_upload(file_obj, '/' + self.request.FILES['file'].name, autorename=True, mute=True)
        serializer.save(dropbox_id=res.id, length=info.info.length)
