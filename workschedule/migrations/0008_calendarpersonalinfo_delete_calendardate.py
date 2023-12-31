# Generated by Django 4.2.3 on 2023-10-07 11:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("workschedule", "0007_alter_personalinfomodel_item1_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="CalendarPersonalinfo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateField()),
                (
                    "item1",
                    models.CharField(
                        choices=[("可", "可"), ("不可", "不可")],
                        max_length=2,
                        verbose_name="大学当直",
                    ),
                ),
                (
                    "item2",
                    models.CharField(
                        choices=[("可", "可"), ("不可", "不可")],
                        max_length=2,
                        verbose_name="取手当直",
                    ),
                ),
                (
                    "item3",
                    models.CharField(
                        choices=[("可", "可"), ("不可", "不可")],
                        max_length=2,
                        verbose_name="高萩当直",
                    ),
                ),
                (
                    "item4",
                    models.CharField(
                        choices=[("可", "可"), ("不可", "不可")],
                        max_length=2,
                        verbose_name="日赤当直",
                    ),
                ),
                (
                    "item5",
                    models.CharField(
                        choices=[("可", "可"), ("不可", "不可")],
                        max_length=2,
                        verbose_name="大学オンコール",
                    ),
                ),
                (
                    "item6",
                    models.CharField(
                        choices=[("可", "可"), ("不可", "不可")],
                        max_length=2,
                        verbose_name="学園オンコール",
                    ),
                ),
                (
                    "item7",
                    models.CharField(
                        choices=[("可", "可"), ("不可", "不可")],
                        max_length=2,
                        verbose_name="龍ヶ崎オンコール",
                    ),
                ),
                (
                    "item8",
                    models.CharField(
                        choices=[("可", "可"), ("不可", "不可")],
                        max_length=2,
                        verbose_name="セントラルオンコール",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="CalendarDate",
        ),
    ]
