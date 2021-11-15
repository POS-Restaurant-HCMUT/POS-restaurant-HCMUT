from django.urls import path
from api.views import *
urlpatterns = [
    path('api/menu', dish_list, name='dish-list'),
    path('api/menu/<str:name>', dish_detail, name='dish-detail'),
    path('api/account/login', customer_login, name='login'),
    path('api/account/signup', customer_signup, name='signup'),
    path('api/update-cart', update_cart, name="update_cart"),
    path('api/pay', pay, name='pay'),
]