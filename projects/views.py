from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK
from rest_framework.permissions import IsAuthenticated

from .serializers import ProjectSerializer

from .models import Project


class ProjectsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
