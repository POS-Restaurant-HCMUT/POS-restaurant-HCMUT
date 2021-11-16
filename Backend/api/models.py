from django.db import models
from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.db.models.fields import DateTimeField

# Create your models here.

class Dish(models.Model):
    name = models.CharField(max_length=100)
    cate = models.IntegerField()
    desc = models.CharField(max_length=256)
    img = models.CharField(max_length=1000)
    price = models.IntegerField()
    remain = models.IntegerField()

class Customer(models.Model):
    username = models.CharField(primary_key=True, max_length=30)
    password = models.CharField(max_length=30)
    displayName = models.CharField(max_length=50)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=10)

class CartItem(models.Model):
    dish = models.ForeignKey(Dish, on_delete=CASCADE)
    quantity = models.IntegerField()
    customer = models.ForeignKey(Customer, on_delete=CASCADE)

class Discount(models.Model):
    value = models.CharField(max_length=10)
    discount = models.IntegerField()

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=CASCADE)
    totalPrice = models.IntegerField(null=True)
    discount = models.ForeignKey(Discount, on_delete=CASCADE)
    orderDate = models.DateTimeField()
    completeDate = models.DateTimeField()
    status = models.CharField(max_length=4)

class OrderItem(models.Model):
    dish = models.ForeignKey(Dish, on_delete=CASCADE)
    order = models.ForeignKey(Order, on_delete=CASCADE)
    quantity = models.IntegerField()



