# Generated by Django 2.2.7 on 2019-11-30 23:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('onboarding', '0003_auto_20191130_2320'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='unit_id',
            field=models.IntegerField(),
        ),
    ]
