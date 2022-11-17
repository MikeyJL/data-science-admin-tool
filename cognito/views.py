"""Views for Cognito app."""

from django.contrib.auth import authenticate, login, logout
from rest_framework.parsers import JSONParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from cognito.serializers import CognitoSerializer


class LoginView(APIView):
    """Login view."""

    parser_classes = [JSONParser]

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
        if user is not None:
            login(request, user)
            serializer = CognitoSerializer(user, many=False)
            return Response(serializer.data, status=HTTP_200_OK)
        else:
            return Response("Error", status=HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """Logout view."""

    def get(self, request: Request) -> Response:
        """Log out the current user.

        Args:
            request (Request): the request received.

        Returns:
            Response: a success message.
        """
        logout(request)

        return Response("Success", status=HTTP_200_OK)
