from django.db import models
from django.core.exceptions import ValidationError


def validate_range(value):
    if 0 < value < 5:
        raise ValidationError('%s Invalid Range' % value)


class Album(models.Model):
    name = models.CharField(max_length=100, unique=True)
    has_cover = models.BooleanField(default=False)
    rating = models.IntegerField(default=0, validators=[validate_range])
    favorite = models.BooleanField(default=False)
    offline = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Playlist(models.Model):
    name = models.CharField(max_length=500, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Music(models.Model):
    album = models.ForeignKey(Album, related_name='tracks', null=True)
    playlist = models.ForeignKey(Playlist, null=True, related_name='tracks')
    title = models.CharField(max_length=200, unique=True)
    artist = models.CharField(max_length=200, unique=True, null=True)
    youtube = models.URLField(max_length=200, unique=True, null=True)
    location = models.CharField(max_length=500, default="")
    rating = models.IntegerField(default=0, validators=[validate_range])
    favorite = models.BooleanField(default=False)
    counter = models.IntegerField(default=0)
    length = models.IntegerField(default=0)
    offline = models.BooleanField(default=False)
    type = (
        ('Fok', 'Folk'),
        ('Jaz', 'Jazz'),
        ('Blu', 'Blues'),
        ('Cls', 'Classical'),
        ('Roc', 'Rock'),
        ('Pop', 'Pop'),
        ('Mel', 'Melody'),
        ('Hip', 'Hip Hop'),
        ('Orc', 'Orchestra'),
        ('Opr', 'Opera'),
        ('Con', 'Country'),
        ('Ins', 'Instrumental'),
        ('Tec', 'Techno'),
        ('Amb', 'Ambient'),
        ('HMe', 'Heavy Metal'),
        ('Dis', 'Disco'),
        ('EDa', 'Euro Dance'),
        ('Met', 'Metal'),
        ('Com', 'Comedy'),
        ('Mov', 'Movie'),
        ('Rel', 'Religious'),
        ('Rim', 'Remix'),
        ('Und', 'Undefined')
    )
    genre = models.CharField(max_length=3, choices=type, default='Und')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class B2Account(models.Model):
    auth_token = models.CharField(max_length=200)
    api_url = models.URLField()
    download_url = models.URLField()
    upload_url = models.URLField(null=True)
    bucket_id = models.CharField(max_length=100, null=True)
    bucket_dir = models.CharField(max_length=50, null=True)
    download_token = models.CharField(max_length=200, null=True)
    upload_token = models.CharField(max_length=200, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
