from django.urls import include, path
from django.urls import path
from django.contrib.auth.views import LoginView
from .views import register_user
from .views import logout_user

urlpatterns = [
    path('login/', LoginView.as_view(template_name='accounts/login.html'),name="login"),
    path('logout/', logout_user, name='logout'),
    path('register/', register_user, name='register')
]