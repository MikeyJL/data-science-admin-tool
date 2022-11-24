"""Views for Cognito app."""

from django.contrib.auth import authenticate, login, logout
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet

from cognito.serializers import CognitoSerializer
from cognito.service import CognitoService


class AuthView(ViewSet):
    """Authentication view."""

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = ()

    parser_classes = [JSONParser]

    def check_auth(self, request: Request) -> Response:
        """Get the authenticated state of the user.

        Args:
            request (Request): the user's request.

        Returns:
            Response: a boolean value to denote if the user is authenticated or not.
        """
        return Response(request.user.is_authenticated, status=HTTP_200_OK)

    def login(self, request: Request) -> Response:
        """Log in the user.

        Args:
            request (Request): has user data to log in with.

        Returns:
            Response: the logged in user.
        """
        username = request.data["username"]
        password = request.data["password"]
        try:
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                serializer = CognitoSerializer(user, many=False)
                return Response(serializer.data, status=HTTP_200_OK)
            else:
                return Response("Error", status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            if e.__class__.__name__ == "UserNotConfirmedException":
                raise PermissionDenied("Need verification")
            raise NotFound("Cannot find user")

    def logout(self, request: Request) -> Response:
        """Log out the current user.

        Args:
            request (Request): the request received.

        Returns:
            Response: a success message.
        """
        CognitoService().logout(request)

        logout(request)

        return Response("Success", status=HTTP_200_OK)


class UserView(APIView):
    """User view."""

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request) -> Response:
        """Get the details of the currently logged in user.

        Args:
            request (Request): the request.

        Returns:
            Response: the current user details.
        """
        try:
            serializer = CognitoSerializer(request.user)
            return Response(serializer.data, status=HTTP_200_OK)
        except Exception:
            return Response(None, status=HTTP_404_NOT_FOUND)


class EmailVerification(APIView):
    """Email verification view."""

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request) -> Response:
        """Send a verification code to the user.

        Args:
            request (Request): the request.

        Returns:
            Response: the response.
        """
        try:
            CognitoService().send_verification(request)
            return Response("OK", status=HTTP_200_OK)
        except Exception:
            return Response(None, status=HTTP_404_NOT_FOUND)

    def post(self, request: Request) -> Response:
        """Confirm a user with verification code.

        Args:
            request (Request): the request.

        Returns:
            Response: the response.
        """
        code = request.data["code"]
        try:
            CognitoService().confirm_verification(request, code)
            return Response("OK", status=HTTP_200_OK)
        except Exception:
            return Response(None, status=HTTP_404_NOT_FOUND)
