from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class Dish(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    category = models.IntegerField(validators=[MinValueValidator(
        limit_value=0), MaxValueValidator(limit_value=2), ])
    desc = models.CharField(max_length=256)
    img = models.CharField(max_length=100000)
    price = models.IntegerField(
        validators=[MinValueValidator(limit_value=0), ],)
    remain = models.IntegerField(validators=[MinValueValidator(
        limit_value=0), MaxValueValidator(limit_value=10000), ],)

    def __str__(self):
        return f"{self.name}"


class Customer(models.Model):
    username = models.CharField(primary_key=True, max_length=30)
    password = models.CharField(max_length=100)
    fullName = models.CharField(max_length=50)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.username}"


class Cart(models.Model):
    # dish = models.ForeignKey()
    owner = models.OneToOneField(
        Customer, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return f"{self.owner}"


class Order(models.Model):
    owner = models.ForeignKey(Customer, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    
    def get_total_price(self):
        pass

    def get_time(self):
        return self.date

    def __str__(self):
        return f"{self.owner} - {self.date}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    dish = models.OneToOneField(Dish, on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(
        limit_value=0), MaxValueValidator(limit_value=100), ])

    def __str__(self):
        return f"{self.dish}({self.quantity}) - {self.cart}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(
        limit_value=0), MaxValueValidator(limit_value=100), ])
    dish = models.OneToOneField(Dish, on_delete=models.CASCADE)

    def get_price(self):
        pass

    def __str__(self):
        return f"{self.dish}({self.quantity})"