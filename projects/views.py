"""Views for Project app."""

from uuid import UUID

from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.viewsets import ViewSet

from .models import Project
from .serializers import ProjectSerializer


class ProjectsView(ViewSet):
    """Project view."""

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_all(self, request: Request) -> Response:
        """Get all projects.

        Args:
            request (Request): request

        Returns:
            Response: all the projects.
        """
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)

        return Response(serializer.data, status=HTTP_200_OK)

    def get_one(self, request: Request, project_id: UUID | str) -> Response:
        """Get a single project.

        Args:
            request (Request): request
            project_id (str | None): project_id

        Returns:
            Response: the project details.
        """
        project = Project.objects.get(id=project_id)
        serializer = ProjectSerializer(project)

        return Response(serializer.data, status=HTTP_200_OK)
