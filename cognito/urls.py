"""Registers URLs for Cognito views."""

from django.urls import re_path

from .views import LoginView, LogoutView

urlpatterns = [
    re_path("login/?", LoginView.as_view()),
    re_path("logout/?", LogoutView.as_view()),
]
