from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Tag, Diary, Notes, Secret
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework import status

