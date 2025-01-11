from django.contrib import admin
from django.urls import include, path
from django.urls import path
from django.contrib.auth.views import LoginView
from django.views.generic import TemplateView






urlpatterns = [
    path("archon/", include("archon.urls")),
    path("accounts/", include("accounts.urls")),

    path("admin/", admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html"))

]