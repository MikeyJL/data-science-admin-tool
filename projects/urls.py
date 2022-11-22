"""Registers URLs for Project views."""

from django.urls import path

from .views import ProjectsView

urlpatterns = [
    path("", ProjectsView.as_view({"get": "get_all"})),
    path("<uuid:project_id>", ProjectsView.as_view({"get": "get_one"})),
]
