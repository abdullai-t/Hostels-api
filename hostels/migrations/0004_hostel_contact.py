# Generated by Django 3.0.5 on 2020-05-10 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostels', '0003_auto_20200417_0036'),
    ]

    operations = [
        migrations.AddField(
            model_name='hostel',
            name='contact',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
