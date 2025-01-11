import json
from django.core.management.base import BaseCommand
from archon.models import Order, Product, OrderItem 
import random




class Command(BaseCommand):
    help = "Load order data from JSON file"

    def handle(self, *args, **kwargs):
        
        product_count = random.randint(1, 6)

        for order in Order.objects.all():

            for item in range(product_count+1):
                product = random.randint(1, 29)
                product =Product.objects.get(product_id=product)
                OrderItem.objects.create(
                    product=product,
                    price=product.price,
                    quantity=1,
                    order=order
                )

        self.stdout.write(self.style.SUCCESS("Successfully loaded order data!"))
