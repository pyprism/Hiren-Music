import shutil
import os
import django
from django.template.defaultfilters import filesizeformat

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hiren.settings")
django.setup()

from hiren.settings import BASE_DIR


def check_storage():
    """
    Check upload and  download directory storage
    :return:
    """
    total, used, free = shutil.disk_usage(BASE_DIR)
    base = {'total': filesizeformat(total), 'used': filesizeformat(used),
            'free': filesizeformat(free)}
    try:
        up_total, up_used, up_free = shutil.disk_usage(BASE_DIR + '/media/music/upload/')
        upload = {'total': filesizeformat(up_total), 'used': filesizeformat(up_used),
                  'free': filesizeformat(up_free)}
    except FileNotFoundError:
        upload = 'not found'
    try:
        down_total, down_used, down_free = shutil.disk_usage(BASE_DIR + '/media/music/download/')
        download = {'total': filesizeformat(down_total), 'used': filesizeformat(down_used),
                    'free': filesizeformat(down_free)}
    except FileNotFoundError:
        download = 'not found'
    return {'upload': upload, 'download': download, 'base': base}

