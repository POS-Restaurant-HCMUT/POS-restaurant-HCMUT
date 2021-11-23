from django.http import HttpResponse, JsonResponse, response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.shortcuts import render
from django.db.models import Q
from django.core import serializers as se

from .serializer import *
from .models import *

@csrf_exempt
def dishes_in_cart(request):
    data = JSONParser().parse(request)
    username=data['username']
    password=data['password']
    isValid = Customer.objects.filter(
            Q(username=username) & Q(password=password))
    if len(isValid) == 0:
        return HttpResponse(401)

    cart = Cart.objects.get(owner=username)
    cart_items = CartItem.objects.filter(cart=cart)
    if request.method == 'POST':
        serializers = CartItemSerializer(cart_items, many=True)
        return JsonResponse(serializers.data, safe=False, json_dumps_params={'ensure_ascii': False})

@csrf_exempt
def dish_list(request):
    if request.method == "GET":
        dish = Dish.objects.all()
        serializers = DishSerializer(dish, many=True)
        return JsonResponse(serializers.data, safe=False, json_dumps_params={'ensure_ascii': False})

    elif request.method == "POST":
        data = JSONParser().parse(request)
        # print(data)
        serializer = DishSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            # return JsonResponse(serializer.data, status=201, json_dumps_params={'ensure_ascii': False})
            return HttpResponse(status=200)
        return HttpResponse(status=400)


@csrf_exempt
def dish_detail(request, name):
    try:
        dish = Dish.objects.get(pk=name)
        print(dish)
    except Dish.DoesNotExist:
        return HttpResponse(status=401)

    if request.method == "GET":
        serializer = DishSerializer(dish)
        return JsonResponse(serializer.data, json_dumps_params={'ensure_ascii': False})
    elif request.method == "PUT":
        data = JSONParser().parse(request)
        serializer = DishSerializer(dish, data=data)
        if serializer.is_valid():
            serializer.save()
            # return JsonResponse(serializer.data, json_dumps_params={'ensure_ascii': False})
            return HttpResponse(status=200)
    elif request.method == "DELETE":
        dish.delete()
        return HttpResponse(status=200)


@csrf_exempt
def customer_login(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        user = Customer.objects.filter(
            Q(username=data['username']) & Q(password=data['password'])).values()
        if len(user) == 1:
            print("login successfully")
            serializer = CustomerSerializer(user[0])
            return JsonResponse(serializer.data, status=200, safe=False, 
                json_dumps_params={'ensure_ascii': False})
        print("login failed")
        return HttpResponse(status=400)

@csrf_exempt
def customer_signup(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        check = Customer.objects.filter(username=data['username'])
        if len(check) != 0:
            return HttpResponse(status=401)
        else:
            Customer.objects.create(username=data['username'], 
                                    password=data['password'], 
                                    fullName=data['fullName'], 
                                    email=data['email'], 
                                    phone=data['phone'])
            owner = Customer.objects.get(username=data['username'])
            Cart(owner=owner).save()
            return HttpResponse(status=200)

@csrf_exempt
def update_cart(request):
    print(request)
    data = JSONParser().parse(request)
    username=data['username']
    password=data['password']
    isValid = Customer.objects.filter(
            Q(username=username) & Q(password=password))
    if len(isValid) == 0:
        return HttpResponse(401)

    cart = Cart.objects.get(owner=username)
    dish = Dish.objects.get(name=data['dish'])

    if request.method == 'POST':
        quantity = data['quantity']
        #cartItem = CartItem(cart=cart, dish=dish, quantity=quantity)
        #cartItem.save()
        cond = Q(cart=cart) & Q(dish=dish)
        
        if (len(list(CartItem.objects.filter(cond).values_list('quantity', flat=True))) == 0):
            cartItem = CartItem(cart=cart, dish=dish, quantity=quantity)
            cartItem.save()
        else:
            cur_quantity = list(CartItem.objects.filter(cond).values_list('quantity', flat=True))[0]
            CartItem.objects.filter(cond).update(quantity=quantity + cur_quantity)
        return HttpResponse(status=200)

    elif request.method == 'DELETE':
        cond = Q(cart=cart) & Q(dish=dish)
        try:
            CartItem.objects.filter(cond).delete()
            return HttpResponse(200)
        except CartItem.DoesNotExist:
            return HttpResponse(401)
        
    elif request.method == 'PUT':
        quantity = data['quantity']
        cond = Q(cart=cart) & Q(dish=dish)
        try:
            CartItem.objects.filter(cond).update(quantity=quantity)
            return HttpResponse(200)
        except CartItem.DoesNotExist:
            return HttpResponse(401)

@csrf_exempt
def pay(request):
    data = JSONParser().parse(request)
    username=data['username']
    password=data['password']
    print(username)
    print(password)
    print("\n\n")
    isValid = Customer.objects.filter(
            Q(username=username) & Q(password=password))
    
    if len(isValid) != 0:
        return HttpResponse(401)
    
    owner = Customer.objects.get(username=username)
    print("done\n\n\n")
    order = Order(owner=owner)
    order.save()
    # print(data['item_list'][0]['item_name'])
    print(data['item_list'])
    for item in data['item_list']:
        print(item)
        dish = Dish.objects.get(name=item['item_name'])
        cart = Cart.objects.get(owner=owner)
        cond = Q(cart = cart) & Q(dish=dish)
        CartItem.objects.filter(cond).delete()
        orderItem = OrderItem(order = order, quantity = item['quantity'], dish = dish)
        orderItem.save()
    return HttpResponse(status=200)

@csrf_exempt
def testPayment(request):
    data = JSONParser().parse(request)
    print(data)
    return HttpResponse(status=200) 
