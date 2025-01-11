from rest_framework import serializers
from .models import Customer, Product, Order, OrderItem

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField(read_only=True)  # Changed to method field
    product_price = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['order_item_id', 'order', 'product','product_name', 'product_price', 'quantity']

    def get_product_name(self, obj):
        return obj.product.name  

    def get_product_price(self, obj):
        return obj.product.price  

class OrderSerializer(serializers.ModelSerializer):

    customer_name = serializers.SerializerMethodField(read_only=True) 
    
    class Meta:
        model = Order
        fields = ['order_id', 'customer','customer_name', 'order_date', 'status', 'total_amount', "tracking_id","shipping_address",'created_at','updated_at']

    def get_customer_name(self, obj):
        return obj.customer.name  
    


