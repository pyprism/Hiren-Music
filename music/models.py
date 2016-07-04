from django.db import models


class Album(models.Model):
    name = models.CharField(max_length=100, unique=True)
    location = models.CharField(max_length=500, null=True)
    has_cover = models.BooleanField(default=False)
    favorite = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    offline = models.BooleanField(default=False)


class Playlist(models.Model):
    name = models.CharField(max_length=500, unique=True)
    created_at = models.DateField(auto_now_add=True)


class Music(models.Model):
    album = models.ForeignKey(Album, related_name='tracks')
    playlist = models.ForeignKey(Playlist, null=True, related_name='tracks')
    name = models.CharField(max_length=200, unique=True)
    location = models.CharField(max_length=500)
    favorite = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    counter = models.IntegerField(default=0)
    length = models.IntegerField(default=0)
    offline = models.BooleanField(default=False)


