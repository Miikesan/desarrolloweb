from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'web'

urlpatterns = [
    path(r'', views.home, name='home'),
    path(r'contacto', views.contacto, name='contacto'),
    path(r'lista_perros/', views.lista_perros, name='lista_perros'),
    path(r'agregar_perro/', views.agregar_perro, name='agregar_perro'),
    url(r'^(?P<id>\d+)/editar/$', views.editar_perro, name="editar_perro"),
    url(r'^(?P<id>\d+)/adoptar/$', views.adoptar_perro, name="adoptar_perro"),
    path(r'<id>/eliminar/', views.eliminar_perro, name='eliminar_perro'),
]