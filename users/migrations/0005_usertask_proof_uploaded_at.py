# Generated by Django 5.1.4 on 2024-12-04 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_usertask_app_delete_app'),
    ]

    operations = [
        migrations.AddField(
            model_name='usertask',
            name='proof_uploaded_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]