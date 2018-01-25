from django.contrib.auth.views import logout
from django.urls import path

urlpatterns = [
    path('logout/', logout, {'next_page': '/'}, name='logout'),
]


