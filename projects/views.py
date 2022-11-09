"""Views for Project app."""

from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from .models import Project
from .serializers import ProjectSerializer


class ProjectsView(APIView):
    """Project view."""

    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        """Get all the projects.

        Args:
            request (Request): the incoming request.

        Returns:
            Response: the list of projects available.
        """
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
