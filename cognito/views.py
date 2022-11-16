"""Views for Cognito app."""

from django.contrib.auth import authenticate
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from cognito.serializers import CognitoSerializer


class LoginView(APIView):
    """Login view."""

    def get(self, request: Request) -> Response:
        """Get the authenticated state of the user.

        Args:
            request (Request): the user's request.

        Returns:
            Response: a boolean value to denote if the user is authenticated or not.
        """
        return Response(request.user.is_authenticated, status=HTTP_200_OK)

    def post(self, request: Request) -> Response:
        """Log in the user.

        Args:
            request (Request): has user data to log in with.

        Returns:
            Response: the logged in user.
        """
        username = request.data["username"]
        password = request.data["password"]
        user = authenticate(username=username, password=password)
        serializer = CognitoSerializer(user, many=False)
        return Response(serializer.data, status=HTTP_200_OK)
