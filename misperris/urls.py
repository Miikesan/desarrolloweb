from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings
from django.conf.urls import url
from django.contrib.auth import views

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'', include('web.urls')),
    url(r'^accounts/',include('accounts.urls')),
    url('^', include('django.contrib.auth.urls')),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
