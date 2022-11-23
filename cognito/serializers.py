"""Serilizer for the CognitoUser model."""

from typing import Any

from rest_framework.serializers import ModelSerializer

from .models import CognitoUser


class CognitoSerializer(ModelSerializer[Any]):
    """Cognito user model serializer."""

    class Meta:
        """Config for serialization."""

        model = CognitoUser
        fields = (
            "id",
            "email",
            "email_verified",
            "is_admin",
            "is_active",
            "last_login",
        )
