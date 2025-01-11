import json
from django.core.management.base import BaseCommand
from archon.models import Order, Customer  # Update with your actual app name

class Command(BaseCommand):
    help = "Load order data from JSON file"

    def handle(self, *args, **kwargs):
        with open('order_data.json', 'r') as file:
            data = json.load(file)

        for item in data:
        
            customer = Customer.objects.get(customer_id=item["customer_id"])
            Order.objects.create(
                customer=customer,
                order_date=item["order_date"],
                status=item["status"],
                total_amount=item["total_amount"],
                tracking_id=item["tracking_id"],
                shipping_address=item["shipping_address"]
            )

        self.stdout.write(self.style.SUCCESS("Successfully loaded order data!"))
