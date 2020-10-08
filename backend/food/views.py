from django.shortcuts import render
from . import models
from django.contrib.auth import get_user_model
from . import serializers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes

# Create your views here.


@api_view(['POST'])
def searchFood(request):
    print(request.data['search'])
    target_Food = models.Food.objects.filter(
        DESC_KOR__contains=request.data['search']).order_by('DESC_KOR')[:5]
    lst = []
    for food in target_Food:
        print(food.DESC_KOR)
        serializer = serializers.FoodSerializer(food)
        lst.append(serializer.data)
    return Response(lst)
