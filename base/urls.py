from django.urls import path, include
from base import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('blackbaze', views.BlackbazeModelView)
router.register('settings', views.SettingsModelView)

urlpatterns = [
    path('login/', views.login, name='login'),
    path('space/', views.StorageView.as_view()),
    path('register/', views.register, name='register'),
    path('b2/', include(router.urls)),
]