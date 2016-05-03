from django.conf.urls import patterns, include, url
from rest_framework.urlpatterns import format_suffix_patterns
from music import views
from django.views.generic import TemplateView

urlpatterns = patterns('',
                       url(r'^$', TemplateView.as_view(template_name="login.html"), name='whatever'),
                       url(r'^albumList$', views.AlbumList.as_view()),
                       url(r'^albumList/(?P<pk>[0-9]+)/$', views.AlbumDetails.as_view()),
                       url(r'^api-token-auth/', 'rest_framework_jwt.views.obtain_jwt_token'),
                       url(r'^docs/', include('rest_framework_swagger.urls')),

)

urlpatterns = format_suffix_patterns(urlpatterns)
