from django.db.models import Model, CharField


class Project(Model):
    name = CharField(max_length=100)
