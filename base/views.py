from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework import status
from django.contrib import auth
from base.models import Account
from django.views.decorators.csrf import csrf_exempt


def login(request):
    """
    token authentication for api
    :param request:
    :return:
    """
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = auth.authenticate(username=username, password=password)
        if user:
            token = Token.objects.get_or_create(user=user)
            return JsonResponse({'token': str(token[0])}, status=status.HTTP_200_OK)
        return JsonResponse({'error': 'Username/Password is not valid'}, status=status.HTTP_401_UNAUTHORIZED)


@csrf_exempt
def register(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    repeat_pass = request.POST.get('repeat_password')
    if password == repeat_pass:
        if Account.objects.filter(username=username).exists():
            return JsonResponse({"error": "account exists"}, status=status.HTTP_403_FORBIDDEN)
        count = Account.objects.count()
        if count == 0:
            Account.objects.create_superuser(username, password)
        else:
            Account.objects.create_user(username, password)
        return JsonResponse({"bugs": "bunny"}, status=status.HTTP_201_CREATED)
    return JsonResponse({"f**k": "off"}, status=status.HTTP_400_BAD_REQUEST)

