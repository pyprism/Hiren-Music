from django.urls import path, include
from music import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register('musician', views.MusicianViewSet)
router.register('album', views.AlbumViewSet)
router.register('track', views.TrackViewSet)
router.register('playlist', views.PlaylistViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

