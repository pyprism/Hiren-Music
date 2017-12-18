from django.conf.urls import url, include
from django.views.generic import TemplateView
from rest_framework import routers
from music import views

router = routers.DefaultRouter()
router.register('bucket', views.B2AccountViewSet)
# router.register('album', views.AlbumViewSet)
# router.register('playlist', views.PlaylistViewSet)
# router.register('music', views.MusicViewSet)
#
urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
#     url(r'^docs/', include('rest_framework_swagger.urls')),
    url(r'^', TemplateView.as_view(template_name='index.html')),
]
