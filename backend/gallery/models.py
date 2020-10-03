from django.db import models
from django.conf import settings
from food.models import Food, KindOf

# Create your models here.

#이거 지우기
def get_default_kindOf() : 
    return KindOf.objects.get (name = "")

class Menu(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    image = models.FileField(upload_to="image", null=True)
    mealTime = models.CharField(max_length=2) #아침/점심/저녁/간식/야식
    kindOf = models.ForeignKey(KindOf, on_delete=models.PROTECT) #한식, 일식, 중식...
    foods = models.ManyToManyField(Food, related_name="foods", blank=True) #음식 이름, 칼로리, 영양성분(탄/단/지)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    totalCal = models.IntegerField(null=True)
