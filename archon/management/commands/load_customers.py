import json
from django.core.management.base import BaseCommand
from archon.models import Customer  

class Command(BaseCommand):
    help = "Load customer data from JSON file"

    def handle(self, *args, **kwargs):
        with open('customer_data.json', 'r') as file:
            data = json.load(file)

        # Loop through the data and create Customer objects
        for item in data:
            Customer.objects.create(
                name=item["name"],
                email=item["email"],
                phone=item.get("phone"),  # Use get() to handle optional fields
                address=item.get("address")
            )
        self.stdout.write(self.style.SUCCESS("Successfully loaded customer data!"))
