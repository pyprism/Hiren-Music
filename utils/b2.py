import requests
import datetime
from requests.auth import HTTPBasicAuth
from base.models import B2Account, Account


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
        b2.auth_token_validity = datetime.datetime.now()
        b2.download_url = bunny['downloadUrl']
        b2.bucket_id = bunny['allowed']['bucketId']
        b2.verification = True
        b2.save()
        return 'ok'
    elif response.status_code == 401:
        return 'not valid'

