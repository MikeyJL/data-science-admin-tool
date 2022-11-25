"""data_science_admin_tool URL Configuration.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/

Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path
from django.urls.conf import re_path
from django.views.generic import RedirectView

from .views import AppView

API_VERSION = "api/v1"

urlpatterns = [
    re_path(f"{API_VERSION}/projects/?", include("projects.urls")),
    re_path(f"{API_VERSION}/auth/?", include("cognito.urls")),
    re_path("^(?!api|admin).*", AppView.as_view()),
    re_path(
        "admin/login/?",
        RedirectView.as_view(url="/", permanent=False),
    ),
    path("admin/", admin.site.urls),
]

admin.site.site_header = "DSAT Admin"
