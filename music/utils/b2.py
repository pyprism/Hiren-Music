import requests
import django
import os
import base64
import json
import logging

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hiren.settings")
django.setup()

from hiren.settings import JSON_DATA
from music.models import B2Account


def auth():
    """
    get auth token
    :return:
    """
    logger = logging.getLogger(__name__)
    b2_id = JSON_DATA['b2_account_id']
    b2_key = JSON_DATA['b2_app_key']
    id_key = b2_id + ":" + b2_key
    headers = {'Authorization': 'Basic ' + (base64.b64encode(bytes(id_key, 'utf-8'))).decode('utf-8')}
    res = requests.get('https://api.backblazeb2.com/b2api/v1/b2_authorize_account', headers=headers)
    if res.status_code == 200:
        data = json.loads(res.text)
        try:
            b2 = B2Account.objects.get(id=1)
            b2.auth_token = data['authorizationToken']
            b2.api_url = data['apiUrl']
            b2.download_url = data['downloadUrl']
            b2.save()
        except:
            B2Account.objects.create(auth_token=data['authorizationToken'],
                                     api_url=data['apiUrl'],
                                     download_url=data['downloadUrl'])
    else:
        logger.error(res.text)


auth()

