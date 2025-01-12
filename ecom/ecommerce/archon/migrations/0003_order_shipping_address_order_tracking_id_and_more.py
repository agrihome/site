# Generated by Django 5.1.4 on 2024-12-19 05:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("archon", "0002_product_active"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="shipping_address",
            field=models.CharField(default="", max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="order",
            name="tracking_id",
            field=models.CharField(default="", max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="order",
            name="status",
            field=models.CharField(
                choices=[
                    ("Pending", "Pending"),
                    ("Processing", "Processing"),
                    ("Shipped", "Shipped"),
                    ("Delivered", "Delivered"),
                    ("Cancelled", "Cancelled"),
                ],
                default="Pending",
                max_length=15,
            ),
        ),
    ]
