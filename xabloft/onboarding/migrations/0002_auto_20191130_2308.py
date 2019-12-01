# Generated by Django 2.2.7 on 2019-11-30 23:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('onboarding', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='place',
            old_name='court',
            new_name='has_court',
        ),
        migrations.RenameField(
            model_name='place',
            old_name='gourmet',
            new_name='has_gourmet',
        ),
        migrations.RenameField(
            model_name='place',
            old_name='green_area',
            new_name='has_green_area',
        ),
        migrations.RenameField(
            model_name='place',
            old_name='grill',
            new_name='has_grill',
        ),
        migrations.RenameField(
            model_name='place',
            old_name='gym',
            new_name='has_gym',
        ),
        migrations.RenameField(
            model_name='place',
            old_name='heated_pool',
            new_name='has_heated_pool',
        ),
        migrations.RenameField(
            model_name='place',
            old_name='kids',
            new_name='has_kids',
        ),
        migrations.RenameField(
            model_name='place',
            old_name='party_room',
            new_name='has_party_room',
        ),
        migrations.RenameField(
            model_name='place',
            old_name='play_game',
            new_name='has_play_game',
        ),
        migrations.RenameField(
            model_name='place',
            old_name='playground',
            new_name='has_playground',
        ),
        migrations.RenameField(
            model_name='place',
            old_name='pool',
            new_name='has_pool',
        ),
        migrations.RenameField(
            model_name='place',
            old_name='power_generator',
            new_name='has_power_generator',
        ),
    ]