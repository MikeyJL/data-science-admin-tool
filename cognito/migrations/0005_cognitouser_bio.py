# Generated by Django 4.1.3 on 2022-11-18 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cognito", "0004_remove_cognitouser_password"),
    ]

    operations = [
        migrations.AddField(
            model_name="cognitouser",
            name="bio",
            field=models.CharField(default="", max_length=255, verbose_name="bio"),
        ),
    ]
