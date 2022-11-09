"""Contains models for projects."""

from uuid import uuid4
from django.db.models import Model, CharField, UUIDField


class Project(Model):
    """Project model."""

    id = UUIDField(primary_key=True, default=uuid4, editable=False)
    name = CharField(max_length=100)
    description = CharField(max_length=500, null=True)

    def __str__(self) -> str:
        """Define the name of the model.

        Returns:
            str: The name of the model to show
        """
        return self.name
