# Generated by Django 5.2 on 2025-05-10 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0006_remove_profile_income_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="interest_search_phrase",
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
