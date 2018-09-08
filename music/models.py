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

