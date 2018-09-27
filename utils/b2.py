import requests
import datetime
import urllib.parse
import hashlib
from requests.auth import HTTPBasicAuth
from base.models import B2Account, Account
from music.models import Track
from datetime import datetime, timedelta
from django.conf import settings


def b2_auth(user):
    """
    authorize and get b2 account token and details
    :param user:
    :return:
    """
    bunny = Account.objects.filter(username=user)
    b2 = B2Account.objects.filter(user=bunny[0]).first()
    app_key = b2.app_key
    app_key_id = b2.app_key_id
    url = 'https://api.backblazeb2.com/b2api/v1/b2_authorize_account'
    response = requests.get(url, auth=HTTPBasicAuth(app_key_id, app_key))
    if response.status_code == 200:
        bunny = response.json()
        b2.api_url = bunny['apiUrl']
        b2.auth_token = bunny['authorizationToken']
        b2.auth_token_validity = datetime.now()
        b2.download_url = bunny['downloadUrl']
        b2.bucket_id = bunny['allowed']['bucketId']
        b2.verification = True
        b2.save()
        return 'ok'
    elif response.status_code == 401:
        return False


def b2_get_upload_url(user):
    """
    Get upload url token
    :param user:
    :return:
    """
    b2 = B2Account.objects.filter(user=user, upload=True).first()
    if abs(datetime.now() - b2.auth_token_validity) > timedelta(hours=23):
        if b2_auth(user):
            b2_get_upload_url(user)
        else:
            return False
    url = '%s/b2api/v1/b2_get_upload_url' % b2.api_url
    header = {'Authorization': b2.auth_token}
    param = {'bucketId': b2.bucket_id}
    response = requests.get(url, headers=header, params=param)
    if response.status_code == 200:
        bunny = response.json()
        b2.upload_url = bunny['uploadUrl']
        b2.upload_token = bunny['authorizationToken']
        b2.upload_token_validity = datetime.now()
        b2.save()


def upload_track(user):
    """
    Upload track to b2 storage
    :param user:
    :return:
    """
    b2 = B2Account.objects.filter(user=user, upload=True).first()
    if b2.upload_token_validity is None:
        b2_get_upload_url(user)
        b2 = B2Account.objects.filter(user=user, upload=True).first()
    elif abs(datetime.now() - b2.upload_token_validity) > timedelta(hours=23):
        b2_get_upload_url(user)
        b2 = B2Account.objects.filter(user=user, upload=True).first()
    tracks = Track.objects.filter(user=user, b2_uploaded=False)
    for track in tracks:
        name = urllib.parse.quote_plus(track.upload.name)
        sha1 = hashlib.sha1()
        with open(track.upload.path, 'rb') as f:
            while True:
                data = f.read(65536)  # 64kb chunks
                if not data:
                    break
                sha1.update(data)
        length = sha1.hexdigest()

        headers = {
            'Authorization': b2.upload_token,
            'X-Bz-File-Name': name[15:],
            'Content-Type': 'b2/x-auto',
            'X-Bz-Content-Sha1': length
        }

        with open(track.upload.path, 'rb') as f:
            raw_response = requests.post(b2.upload_url, data=f, headers=headers)
        if raw_response.status_code == 200:
            response = raw_response.json()
            track.b2_uploaded = True
            track.b2_file_id = response['fileId']
            track.save()

