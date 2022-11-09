"""Registers Project model to admin site."""

from django.contrib import admin

from .models import Project

admin.site.register(Project)
