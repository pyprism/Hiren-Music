from django.contrib.auth.views import logout
from django.urls import path
from base import views

urlpatterns = [
    path('', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', logout, {'next_page': '/'}, name='logout'),
]


