"""Serilizer for the project model."""

from typing import Any
from rest_framework.serializers import ModelSerializer

from .models import Project


class ProjectSerializer(ModelSerializer[Any]):
    """Project model serializer."""

    class Meta:
        """Config for serialization."""

        model = Project
        fields = ("id", "name", "description")
