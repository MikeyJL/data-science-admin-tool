"""Custom admin configuration."""

from typing import Any

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth.models import Group
from django.core.exceptions import ValidationError
from django.forms import CharField, ModelForm, PasswordInput

from cognito.models import CognitoUser


class UserCreationForm(ModelForm[Any]):
    """Form layout for creating a new user."""

    password = CharField(label="Password", widget=PasswordInput)
    password_confirm = CharField(label="Confirm Password", widget=PasswordInput)

    class Meta:
        """Metadata about relating user and fields."""

        user = CognitoUser
        fields = ("email", "id")

    def check_password(self) -> str | None:
        """Check if the password matches.

        Returns:
            str | None: Either raises an error or returns the password.
        """
        password = self.cleaned_data.get("password")
        password_confirmed = self.cleaned_data.get("password_confirmed")

        if password and password_confirmed and password != password_confirmed:
            raise ValidationError("Passwords must match")

        return password_confirmed

    def save(self, commit: bool = True) -> Any:
        """Save the new user account.

        Args:
            commit (bool): whether to save the user.

        Returns:
            Any: the new user.
        """
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class UserChangeForm(ModelForm[Any]):
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
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_admin",)}),
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


admin.site.register(CognitoUser, UserAdmin)
admin.site.unregister(Group)
