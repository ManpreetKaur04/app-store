# Generated by Django 5.1.4 on 2024-12-06 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_usertask_proof_uploaded_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='androidapp',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to='media/app_logos/'),
        ),
    ]