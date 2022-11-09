"""Django app views."""

from django.views.generic import TemplateView


class AppView(TemplateView):
    """Django app view."""

    template_name = "index.html"
