from typing import Any
from rest_framework.serializers import ModelSerializer

from .models import Project


class ProjectSerializer(ModelSerializer[Any]):
    class Meta:
        model = Project
        fields = ("id", "name", "description")
