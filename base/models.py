from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager


class AccountManager(BaseUserManager):

    def create_user(self, username=None, password=None, **kwargs):
        account = self.model(username=username)

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, username, password, **kwargs):
        account = self.create_user(username, password, **kwargs)
        account.is_admin = True
        account.save()
        return account


class Account(AbstractBaseUser):
    username = models.CharField(max_length=40, unique=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'username'

    objects = AccountManager()


class Setting(models.Model):
    active = models.BooleanField(default=True)
    task_type = (
        ('S', 'Signup'),
    )
    task = models.CharField(choices=task_type, max_length=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class B2Account(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    app_key = models.CharField(max_length=500)
    app_key_id = models.CharField(max_length=500)
    upload = models.BooleanField(default=True)
    auth_token = models.CharField(max_length=200, null=True)
    auth_token_validity = models.DateTimeField(null=True)
    api_url = models.URLField(null=True)
    download_url = models.URLField(null=True)
    upload_url = models.URLField(null=True)
    bucket_id = models.CharField(max_length=100, null=True)
    bucket_dir = models.CharField(max_length=50, null=True)
    download_token = models.CharField(max_length=200, null=True)
    upload_token = models.CharField(max_length=200, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


