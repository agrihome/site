from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework.routers import DefaultRouter
from . import views
from .views import model_metadata_view, order_table, product_table, customer_table, order_item_table

router = DefaultRouter()
router.register(r'order', views.OrderViewSet)
router.register(r'order-item', views.OrderItemViewSet)
router.register(r'product', views.ProductViewSet)
router.register(r'customer', views.CustomerViewSet)



urlpatterns = [

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair')  ,
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh') ,
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    path('meta/', model_metadata_view,name="meta"),
    path('order/table', order_table,name="order"),
    path('product/table', product_table,name="product"),
    path('customer/table', customer_table,name="customer"),
    path('order_item/table', order_item_table,name="order_item"),

    path('api/', include(router.urls))




    
    
]
