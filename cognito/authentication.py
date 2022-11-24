"""Cognito authentication backend."""

from typing import Any, Optional
from uuid import UUID

from django.contrib.auth.backends import BaseBackend
from django.http.request import HttpRequest

from cognito.models import CognitoUser

from .service import CognitoService


class CognitoBackend(BaseBackend):
    """Custom backend for AWS Cognito."""

    def authenticate(  # type: ignore
        self,
        request: Optional[HttpRequest],
        username: str,
        password: str,
    ) -> Any:
        """Authenticate a user.

        Args:
            request (HttpRequest): the incoming request.
            username: the username of the user.
            password: the password of the user.
        """
        CognitoService().authenticate(username, password)

        return CognitoUser.objects.get(email=username)

    def get_user(self, user_id: UUID | str) -> Any:  # type: ignore
        """Get the currently signed-in user.

        Args:
            user_id (int): the user identifier.

        Returns:
            Optional[AbstractBaseUser]: the user.
        """
        return CognitoUser.objects.get(pk=user_id)
