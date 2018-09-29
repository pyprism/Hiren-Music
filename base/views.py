from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework import views
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.authtoken.models import Token
from .serializers import BlackbazeSerializer, SettingsSerializer, StorageSerializer
from django.http import JsonResponse
from rest_framework import status
from django.contrib import auth
from base.models import Account, B2Account, Setting
from django.views.decorators.csrf import csrf_exempt
from utils.b2 import b2_auth
from utils.storage import check_storage


@csrf_exempt
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
    if request.method == 'POST':
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


class BlackbazeModelView(ModelViewSet):
    """
    Blackbaze B2 account management
    """
    authentication_classes = (TokenAuthentication, BasicAuthentication, SessionAuthentication)
    serializer_class = BlackbazeSerializer
    queryset = B2Account.objects.all()

    def perform_create(self, serializer):
        if self.request.POST.get('upload') or self.request.POST.get('upload') == 'true':  # only one active B2 account
            if B2Account.objects.filter(user=self.request.user, upload=True).exists():
                query = B2Account.objects.filter(user=self.request.user, upload=True).first()
                query.upload = False
                query.save()
        serializer.save(user=self.request.user)
        b2_auth(self.request.user.username)

    def perform_update(self, serializer):
        if self.request.POST.get('upload') or self.request.POST.get('upload') == 'true':  # only one active B2 account
            if B2Account.objects.filter(user=self.request.user, upload=True).exists():
                query = B2Account.objects.filter(user=self.request.user, upload=True).first()
                query.upload = False
                query.save()


class SettingsModelView(ModelViewSet):
    authentication_classes = (TokenAuthentication, BasicAuthentication, SessionAuthentication)
    serializer_class = SettingsSerializer
    queryset = Setting.objects.all()


class StorageView(views.APIView):
    """
    Return local storage status
    """
    authentication_classes = (TokenAuthentication, BasicAuthentication, SessionAuthentication)

    def get(self, request):
        data = [check_storage()]
        results = StorageSerializer(data, many=True).data
        return Response(results)


