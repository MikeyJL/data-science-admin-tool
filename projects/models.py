from django.db.models import Model, CharField


class Project(Model):
    name = CharField(max_length=100)
    description = CharField(max_length=500, null=True)

    def __str__(self) -> str:
        return self.name
