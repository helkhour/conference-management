# Generated by Django 5.2 on 2025-04-13 21:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('costs', '0003_alter_cost_year'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cost',
            name='year',
            field=models.IntegerField(default=2025),
        ),
    ]
