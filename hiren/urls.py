from django.conf.urls import patterns, include, url
from rest_framework.urlpatterns import format_suffix_patterns
from music import views


urlpatterns = patterns('',
                       url(r'^$', views.AlbumList.as_view()),
                       url(r'^(?P<pk>[0-9]+)/$', views.AlbumDetails.as_view())

)

urlpatterns = format_suffix_patterns(urlpatterns)