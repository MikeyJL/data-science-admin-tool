"""Custom admin configuration."""

from typing import Any

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
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

    class Meta:
        """Metadata about relating user and fields."""

        user = CognitoUser
        fields = ("email", "id")

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

    password = ReadOnlyPasswordHashField()

    class Meta:
        """Metadata about relating user and fields."""

        model = CognitoUser
        fields = "__all__"


class UserAdmin(BaseUserAdmin):
    """Form layout for displaying admin user details."""

    add_form = UserCreationForm
    form = UserChangeForm

    list_display = ("email", "is_admin", "is_active", "last_login")
    list_filter = ("is_admin",)
    fieldsets = (
        (None, {"fields": ("email",)}),
        ("Access", {"fields": ("is_admin", "is_active")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password", "password_confirmed"),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)
    filter_horizontal = ()

    def delete_model(self, request: HttpRequest, obj: CognitoUser) -> None:
        """Delete the user from Cognito and from DB.

        Args:
            request (HttpRequest): the request object.
            obj (CognitoUser): the user model to delete.
        """
        CognitoService().delete_user(obj.get_username())

        obj.delete()


admin.site.register(CognitoUser, UserAdmin)
admin.site.unregister(Group)
