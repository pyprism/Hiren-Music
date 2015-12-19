from django.db import models
from django.template.defaultfilters import slugify
import datetime


class Album(models.Model):
    name = models.CharField(max_length=100, unique=True)
    favorite = models.BooleanField(default=False)
    added_at = models.DateField(auto_now_add=True)


class Music(models.Model):
    album = models.ForeignKey(Album)
    name = models.CharField(max_length=200, unique=True)
    slug = models.CharField(max_length=150, unique=True)
    favorite = models.BooleanField(default=False)
    added_at = models.DateField(auto_now_add=True)
    location = models.URLField(null=True, default=None)
    local_location = models.FileField(upload_to='hiren/%Y/%m/%d', null=True, default=None)

    def save(self):
        super().save()
        date = datetime.date.today()
        self.slug = '%i/%i/%i/%s' % (
            date.year, date.month, date.day, slugify(self.name)
        )
        super().save()


class Dropbox(models.Model):
    enabled = models.BooleanField(default=False)
    access_token = models.CharField(max_length=300)
    client_id = models.CharField(max_length=300)
    client_secret = models.CharField(max_length=300)
    redirect_uri = models.URLField()
