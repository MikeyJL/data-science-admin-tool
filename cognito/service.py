"""Service to interact with AWS Congnito."""

import boto3
from django.core.cache import cache
from pycognito import Cognito
from rest_framework.request import Request

from data_science_admin_tool.settings import COGNITO_CONFIG

cognitoClient = boto3.client("cognito-idp")


class CognitoService:
    """AWS Cognito service."""

    def authenticate(self, username: str, password: str) -> None:
        """Authenticate a user.

        Args:
            username (str): the username which is an email.
            password (str): the password.
        """
        u = Cognito(**COGNITO_CONFIG, username=username)
        u.authenticate(
            password,
        )

        try:
            cache.set(f"access_token_{u.username}", u.access_token, None)
            cache.set(f"refresh_token_{u.username}", u.refresh_token, None)
        except Exception as e:
            # TODO: Replace with logger
            print(e)

    def logout(self, request: Request) -> None:
        """Log out the current user.

        Args:
            request (Request): the request to logout.
        """
        access_key = f"access_token_{request.user.get_username()}"
        refresh_key = f"refresh_token_{request.user.get_username()}"
        access_token = cache.get(access_key)

        Cognito(**COGNITO_CONFIG, access_token=access_token).logout()

        cache.delete(access_key)
        cache.delete(refresh_key)

    def create_user(self, email: str, password: str) -> None:
        """Create a new user on DB and Cognito.

        Args:
            email (str): the email of the user.
            password (str): the password of ther user.
        """
        u = Cognito(**COGNITO_CONFIG)
        u.set_base_attributes(email=email)
        u.register(email, password)

    def delete_user(self, username: str) -> None:
        """Delete a user as an admin using IAM credentials.

        Args:
            username (str): the username (email) of the user to delete.
        """
        cognitoClient.admin_delete_user(
            UserPoolId=COGNITO_CONFIG["user_pool_id"], Username=username
        )
