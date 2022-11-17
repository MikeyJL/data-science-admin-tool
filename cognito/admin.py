"""Custom admin configuration."""

from typing import Any

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth.models import Group
from django.core.exceptions import ValidationError
from django.forms import CharField, ModelForm, PasswordInput
from pycognito import Cognito

from data_science_admin_tool.settings import COGNITO_CONFIG

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
            u = Cognito(**COGNITO_CONFIG)
            u.set_base_attributes(email=email)
            u.register(email, password)
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
        fields = ("email", "password", "is_active", "is_admin")


class UserAdmin(BaseUserAdmin):
    """Form layout for displaying admin user details."""

    add_form = UserCreationForm
    form = UserChangeForm

    list_display = ("email", "is_admin")
    list_filter = ("is_admin",)
    fieldsets = (
        (None, {"fields": ("email",)}),
        ("Permissions", {"fields": ("is_admin",)}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email",),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)
    filter_horizontal = ()


admin.site.register(CognitoUser, UserAdmin)
admin.site.unregister(Group)
