from django.db import models


class Album(models.Model):
    name = models.CharField(max_length=100, unique=True)
    favorite = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)


class Playlist(models.Model):
    name = models.CharField(max_length=500, unique=True)
    created_at = models.DateField(auto_now_add=True)


class Music(models.Model):
    album = models.ForeignKey(Album, related_name='tracks')
    playlist = models.ForeignKey(Playlist, null=True, related_name='tracks')
    name = models.CharField(max_length=200, unique=True)
    dropbox_id = models.CharField(max_length=500, null=True)
    favorite = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    counter = models.IntegerField(default=0)


