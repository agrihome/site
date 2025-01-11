import json
from django.core.management.base import BaseCommand
from archon.models import Product  

class Command(BaseCommand):
    help = "Load customer data from JSON file"

    def handle(self, *args, **kwargs):
        with open('product_data.json', 'r') as file:
            data = json.load(file)

        for item in data:
            Product.objects.create(
                name=item["name"],
                description=item["description"],
                price=item["price"],
                stock=item["stock"],
                category=item["category"],
                active=item["active"]
            )
        self.stdout.write(self.style.SUCCESS("Successfully loaded product data!"))
