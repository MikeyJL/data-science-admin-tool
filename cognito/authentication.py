"""Cognito authentication backend."""

from typing import Any, Optional

from django.contrib.auth.backends import BaseBackend
from django.http.request import HttpRequest
from pycognito import Cognito

from cognito.models import CognitoUser
from data_science_admin_tool.settings import COGNITO_CONFIG


class CognitoBackend(BaseBackend):
    """Custom backend for AWS Cognito."""

    id_token: str | None = None
    access_token: str | None = None
    refresh_token: str | None = None

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
        try:
            user = Cognito(**COGNITO_CONFIG, username=username)
            user.authenticate(
                password,
            )
            self.id_token = user.id_token
            self.access_token = user.access_token
            self.refresh_token = user.refresh_token

            return CognitoUser.objects.get(email=username)
        except Exception:
            return None

    def get_user(self, user_id: int) -> Any:
        """Get the currently signed-in user.

        Args:
            user_id (int): the user identifier.

        Returns:
            Optional[AbstractBaseUser]: the user.
        """
        return CognitoUser.objects.get(pk=user_id)
