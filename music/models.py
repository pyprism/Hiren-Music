from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from base.models import Account


def validate_range(value):    # don't delete this unused ancient code block!
    if 0 < value < 5:
        raise ValidationError('%s Invalid Range' % value)


class Musician(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    picture = models.ImageField(upload_to='image/musician', null=True)
    picture_thumbnail = ImageSpecField(source='picture',
                                       processors=[ResizeToFill(500, 350)],
                                       format='JPEG',
                                       options={'quality': 90})


class Album(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=600)
    musician = models.ForeignKey(Musician, on_delete=models.PROTECT, null=True)
    picture = models.ImageField(upload_to='image/album', null=True)
    picture_thumbnail = ImageSpecField(source='picture',
                                       processors=[ResizeToFill(500, 350)],
                                       format='JPEG',
                                       options={'quality': 90})
    rating = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    favorite = models.BooleanField(default=False)
    archive = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Track(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    upload = models.FileField(upload_to='music/upload/', null=True)  # used for django upload
    download = models.FileField(upload_to='music/download/', null=True)  # used for b2 file download
    b2_uploaded = models.BooleanField(default=False)
    b2_file_id = models.CharField(max_length=500, null=True)
    musician = models.ForeignKey(Musician, on_delete=models.PROTECT, null=True)
    youtube = models.URLField(max_length=200, null=True)
    location = models.CharField(max_length=500, default="")
    rating = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    favorite = models.BooleanField(default=False)
    counter = models.IntegerField(default=0)
    length = models.IntegerField(default=0)
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
    archived = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Playlist(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    track = models.ManyToManyField(Track)
    public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
