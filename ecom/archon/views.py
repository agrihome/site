from rest_framework.response import Response
from .models import Customer, Product, Order, OrderItem
from .serializers import CustomerSerializer, ProductSerializer, OrderSerializer, OrderItemSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.decorators import api_view, permission_classes
from datetime import date, timedelta
from django.apps import apps
from django.db import models
from rest_framework import viewsets



today = date.today()
yesterday = today - timedelta(1)

def get_model_fields_metadata(model_class):
    fields_metadata = {}

    primary_key_field = model_class._meta.pk
    fields_metadata['primary_key'] = {
        'field_name': primary_key_field.name,
        'field_type': primary_key_field.get_internal_type(),
    }

    for field in model_class._meta.fields:
        field_data = {
            'field_name': field.name,
            'field_type': field.get_internal_type(),
            'null': field.null,
            'blank': field.blank,
            'verbose_name': field.verbose_name,
            'help_text': field.help_text,
            'max_length': getattr(field, 'max_length', None),
            'choices': getattr(field, 'choices', None),
        }

        if isinstance(field, models.ForeignKey):
            field_data['is_foreign_key'] = True
            field_data['related_model'] = field.related_model.__name__
        elif isinstance(field, models.OneToOneField):
            field_data['is_one_to_one'] = True
            field_data['related_model'] = field.related_model.__name__
        elif isinstance(field, models.ManyToManyField):
            field_data['is_many_to_many'] = True
            field_data['related_model'] = field.related_model.__name__

        if field.choices:
            field_data['is_select_field'] = True

        fields_metadata[field.name] = field_data

    return fields_metadata

@api_view(['POST'])
@permission_classes([AllowAny])
def model_metadata_view(request):


    model_name = request.data.get('model_name',None)


    if not model_name:
        return Response({"error": "Model name is required"}, status=400)

    try:
        model_class = apps.get_model('archon', model_name)
    except LookupError:
        return Response({"error": f"Model '{model_name}' not found"}, status=404)

    metadata = get_model_fields_metadata(model_class)

    return Response(metadata)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_count_today(request):

    order = len(Order.objects.filter(order_date=today))
    yesterday_order = len(Order.objects.filter(order_date=yesterday))
    return Response({"today":order,"yesterday":yesterday_order})

class OrderViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing orders.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]  # Change to IsAuthenticated if you want authentication

class OrderItemViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing order items.
    """
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [AllowAny]  # Change to IsAuthenticated if you want authentication

class ProductViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]  # Change to IsAuthenticated if you want authentication

class CustomerViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing customers.
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [AllowAny]  # Change to IsAuthenticated if you want authentication


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def order_table(request):
    filters = request.data.get('filter', {})

    orders = Order.objects.all()

    if filters:
        for key, value in filters.items():
            if value is not None:
                orders = orders.filter(**{key: value})

    order_serializer = OrderSerializer(orders, many=True)
    return Response(order_serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def product_table(request):
    filters = request.data.get('filter', {})

    products = Product.objects.all()

    if filters:
        for key, value in filters.items():
            if value is not None:
                products = products.filter(**{key: value})

    product_serializer = ProductSerializer(products, many=True)
    return Response(product_serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def customer_table(request):
    filters = request.data.get('filter', {})

    customers = Customer.objects.all()

    if filters:
        for key, value in filters.items():
            if value is not None:
                customers = customers.filter(**{key: value})

    customer_serializer = CustomerSerializer(customers, many=True)
    return Response(customer_serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def order_item_table(request):
    filters = request.data.get('filter', {})

    order_items = OrderItem.objects.all()

    if filters:
        for key, value in filters.items():
            if value is not None:
                order_items = order_items.filter(**{key: value})

    order_item_serializer = OrderItemSerializer(order_items, many=True)
    return Response(order_item_serializer.data)


