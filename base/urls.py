from django.urls import path, include
from base import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('b2', views.BlackbazeModelView)

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('b2/', include(routers)),
]