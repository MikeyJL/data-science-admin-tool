"""Registers URLs for Cognito views."""

from django.urls import re_path

from .views import AuthView, UserView

urlpatterns = [
    re_path("login/?", AuthView.as_view({"get": "check_auth", "post": "login"})),
    re_path("logout/?", AuthView.as_view({"get": "logout"})),
    re_path("user/?", UserView.as_view()),
]
