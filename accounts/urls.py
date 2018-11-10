from django.conf.urls import url
from django.urls import path
from . import views
from django.contrib.auth.views import (
    PasswordResetView,
    PasswordResetConfirmView,
    PasswordResetDoneView,
    PasswordResetCompleteView,
)

app_name = 'accounts'

urlpatterns = [
    url(r'^login/$', views.login_account, name="login_account"),
    url(r'^register/$', views.register, name='register'),
    url(r'^register_thanks/$', views.register_thanks, name='register_thanks'),
    url(r'^logout/$', views.logout_account, name='logout_account'),
    url(r'^recover_password/$', views.recover_password, name='recover_password'),
    url(r'^password_reset', PasswordResetView.as_view(), {
        'template_name':'password_reset_form.html', 
        'email_template_name':'password_reset_email.html'}, name="password_reset"),
    url(r'^reset/password_reset_done', PasswordResetDoneView.as_view(), {'template_name':'registration/password_reset_done.html'}, name="password_reset_done"),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', PasswordResetConfirmView.as_view(),  {'template_name':'accounts/password_reset_confirm.html'}, name="password_reset_confirm"),
    url(r'^reset/done', PasswordResetCompleteView.as_view(), {'template_name':'registration/password_reset_complete.html'}, name="password_reset_complete"),
]
