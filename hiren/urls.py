from django.conf.urls import url, include
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework import routers
# from music import views
#
router = routers.DefaultRouter()
# router.register('album', views.AlbumViewSet)
# router.register('playlist', views.PlaylistViewSet)
# router.register('music', views.MusicViewSet)
#
urlpatterns = [
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
#     url(r'^docs/', include('rest_framework_swagger.urls')),
    url(r'^', TemplateView.as_view(template_name='index.html')),
]
