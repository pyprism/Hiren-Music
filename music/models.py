from django.db import models
from django.core.exceptions import ValidationError
from base.models import Account


def validate_range(value):
    if 0 < value < 5:
        raise ValidationError('%s Invalid Range' % value)


class Album(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=600)
    has_cover = models.BooleanField(default=False)
    rating = models.IntegerField(default=0, validators=[validate_range])
    favorite = models.BooleanField(default=False)
    offline = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Track(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, related_name='tracks', null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, unique=True)
    artist = models.CharField(max_length=200, unique=True, null=True)
    youtube = models.URLField(max_length=200, unique=True, null=True)
    location = models.CharField(max_length=500, default="")
    rating = models.IntegerField(default=0, validators=[validate_range])
    favorite = models.BooleanField(default=False)
    counter = models.IntegerField(default=0)
    length = models.IntegerField(default=0)
    offline = models.BooleanField(default=False)
    genre_type = (
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
    genre = models.CharField(max_length=3, choices=genre_type, default='Und')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Playlist(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=500, unique=True)
    track = models.ManyToManyField(Track)
    offline = models.BooleanField(default=False)
    public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
