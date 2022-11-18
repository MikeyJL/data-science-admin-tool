"""Service to interact with AWS Congnito."""

import boto3
from pycognito import Cognito

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
