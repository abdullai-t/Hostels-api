# Generated by Django 3.0.5 on 2020-04-15 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_profile',
            name='avatar',
            field=models.ImageField(blank=True, default='profiles/1.svg', null=True, upload_to='profiles'),
        ),
    ]
