from uuid import uuid4
from django.db.models import Model, CharField, UUIDField


class Project(Model):
    id = UUIDField(primary_key=True, default=uuid4, editable=False)
    name = CharField(max_length=100)
    description = CharField(max_length=500, null=True)

    def __str__(self) -> str:
        return self.name
