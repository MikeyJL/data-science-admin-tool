"""Custom Cognito user model."""

from typing import Any
from uuid import uuid4

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db.models import BooleanField, EmailField, UUIDField


class CognitoUserManager(BaseUserManager[Any]):
    """Django manager for Cognito user."""

    def create_user(self, email: str, password: str) -> Any:
        """Create a new standard user.

        Args:
            email (str): the user's email.
            password (str): the user's password

        Returns:
            Any: either the new user or None.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, password: str) -> Any:
        """Create a super/admin user.

        Args:
            email (str): the user's email.
            password (str): the user's password.

        Returns:
            Any: either the new admin user or None.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class CognitoUser(AbstractBaseUser, PermissionsMixin):
    """The Cognito user entity."""

    id = UUIDField(primary_key=True, default=uuid4, editable=False)
    email = EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    password = None  # type: ignore
    is_active = BooleanField(default=True)
    is_admin = BooleanField(default=False)

    objects = CognitoUserManager()

    USERNAME_FIELD = "email"

    class Meta:
        """Metadata about the user model."""

        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self) -> str:
        """Get the name of the email as the key.

        Returns:
            str: the email of the user.
        """
        return self.email

    def has_perm(self, perm: Any, obj: Any = None) -> bool:
        """Check if the user has permissions.

        Returns:
            bool: Whether the user has permission.
        """
        return self.is_admin

    def has_module_perms(self, app_label: str) -> bool:
        """Check if the user has module permissions.

        Returns:
            bool: Whether the user has module permission.
        """
        return self.is_admin

    @property
    def is_staff(self) -> bool:
        """Check if the user has admin permissions.

        Returns:
            bool: Whether the user has admin permission.
        """
        return self.is_admin
