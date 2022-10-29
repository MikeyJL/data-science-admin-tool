from typing import Any
from django.views.generic import TemplateView


class AppView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, str]:
        return {"context_variable": "value"}
