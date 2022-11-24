"""Custom admin configuration."""

from typing import Any

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from django.core.exceptions import ValidationError
from django.forms import CharField, ModelForm, PasswordInput
from django.http.request import HttpRequest

from cognito.service import CognitoService

from .models import CognitoUser


class UserCreationForm(ModelForm):  # type: ignore
    """Form layout for creating a new user."""

    password = CharField(label="Password", widget=PasswordInput)
    password_confirmed = CharField(label="Confirm Password", widget=PasswordInput)
    bio = CharField(max_length=255, required=False)

    class Meta:
        """Metadata about relating user and fields."""

        user = CognitoUser
        fields = "__all__"

    def clean(self) -> None:
        """Check if the password matches."""
        password = self.cleaned_data.get("password")
        password_confirmed = self.cleaned_data.get("password_confirmed")

        if password and password_confirmed and password != password_confirmed:
            raise ValidationError("Passwords must match")

    def save(self, commit: bool = True) -> Any:
        """Save the new user account.

        Args:
            commit (bool): whether to save the user.

        Returns:
            Any: the new user.
        """
        email = self.cleaned_data["email"]
        password = self.cleaned_data["password"]

        user = super().save(commit=False)
        user.set_password(password)

        try:
            CognitoService().create_user(email, password)
        except Exception as e:
            raise ValueError(e)

        if commit:
            user.save()
        return user


class UserChangeForm(ModelForm):  # type: ignore
    """Form layout for updating a user."""

    bio = CharField(max_length=255, required=False)

    class Meta:
        """Metadata about relating user and fields."""

        model = CognitoUser
        fields = "__all__"


class UserAdmin(BaseUserAdmin):
    """Form layout for displaying admin user details."""

    add_form = UserCreationForm
    form = UserChangeForm

    actions = None
    readonly_fields = ("email_verified",)
    list_display = ("email", "email_verified", "is_admin", "is_active", "last_login")
    list_filter = ()
    fieldsets = (
        (None, {"fields": ("email", "bio", "email_verified")}),
        ("Access", {"fields": ("is_admin", "is_active")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password", "password_confirmed", "bio"),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)

    def delete_model(self, request: HttpRequest, obj: CognitoUser) -> None:
        """Delete the user from Cognito and from DB.

        Args:
            request (HttpRequest): the request object.
            obj (CognitoUser): the user model to delete.
        """
        current_username = request.user.get_username()
        to_delete_username = obj.get_username()

        if current_username == to_delete_username:
            return None

        CognitoService().delete_user(to_delete_username)

        obj.delete()


admin.site.register(CognitoUser, UserAdmin)
admin.site.unregister(Group)
