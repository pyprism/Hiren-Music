from django.urls import path
from music import views
from django.contrib.auth.views import logout

urlpatterns = [
    path('logout/', logout, {'next_page': '/'}, name='logout'),
]



