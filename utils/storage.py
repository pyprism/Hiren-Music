import shutil
import os
import django
import subprocess
from django.template.defaultfilters import filesizeformat

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hiren.settings")
django.setup()

from hiren.settings import BASE_DIR


def folder_size(path='.'):     # TODO refactor storage uses logic
    return subprocess.check_output(['du', '-sh', path]).split()[0].decode('utf-8')


def check_storage():
    """
    Check upload and  download directory storage
    :return:
    """
    total, used, free = shutil.disk_usage(BASE_DIR)
    percentage = (used[:-1] / total) * 100
    used = folder_size(BASE_DIR)
    base = {'total': filesizeformat(total), 'used': used,
            'free': filesizeformat(free), 'percentage': round(percentage)}
    try:
        up_total, up_used, up_free = shutil.disk_usage(BASE_DIR + '/media/music/upload/')
        up_used = folder_size(BASE_DIR + '/media/music/upload/')
        percentage = (int(up_used[:-1]) / up_total) * 100
        upload = {'total': filesizeformat(up_total), 'used': up_used,
                  'free': filesizeformat(up_free), 'percentage': round(percentage)}
    except FileNotFoundError:
        upload = 'not found'
    try:
        down_total, down_used, down_free = shutil.disk_usage(BASE_DIR + '/media/music/download/')
        down_used = folder_size(BASE_DIR + '/media/music/download/')
        percentage = (int(down_used[:-1]) / down_total) * 100
        download = {'total': filesizeformat(down_total), 'used': down_used,
                    'free': filesizeformat(down_free), 'percentage': round(percentage)}
    except FileNotFoundError:
        download = 'not found'
    return {'upload': upload, 'download': download, 'base': base}

