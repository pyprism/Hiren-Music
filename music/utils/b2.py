import requests
import django
import os
import base64

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hiren.settings")
django.setup()

from hiren.settings import JSON_DATA


def auth():
    b2_id = JSON_DATA['b2_account_id']
    b2_key = JSON_DATA['b2_app_key']
    # id_key = bytes(b2_id + ":" + b2_key, encoding='UTF-8')
    id_key = b2_id + ":" + b2_key
    headers = {'Authorization': b'Basic ' + id_key.encode('ascii')}
    print(headers)
    res = requests.get('https://api.backblazeb2.com/b2api/v1/b2_authorize_account', headers=headers)
    print(res.content)


auth()

