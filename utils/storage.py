import shutil
import os
import django
import subprocess
from django.template.defaultfilters import filesizeformat

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hiren.settings")
django.setup()

from hiren.settings import BASE_DIR


def folder_size(path='.'):
    return subprocess.check_output(['du', '-sh', path]).split()[0].decode('utf-8')


def check_storage():
    """
    Check upload and  download directory storage
    :return:
    """
    total, used, free = shutil.disk_usage(BASE_DIR + '/media/')
    percentage = (free / total) * 100
    used = folder_size(BASE_DIR + '/media/')   # actual usage
    base = {'total': filesizeformat(total), 'used': used,
            'free': filesizeformat(free), 'percentage': round(percentage)}
    return {'base': base}

