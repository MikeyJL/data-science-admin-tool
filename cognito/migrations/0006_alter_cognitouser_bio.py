# Generated by Django 4.1.3 on 2022-11-18 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cognito", "0005_cognitouser_bio"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cognitouser",
            name="bio",
            field=models.CharField(max_length=255, null=True, verbose_name="bio"),
        ),
    ]
