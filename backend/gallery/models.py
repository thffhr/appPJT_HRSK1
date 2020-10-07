from django.db import models
from django.conf import settings
from food.models import Food

# Create your models here.


class Menu(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    image = models.FileField(upload_to="image", null=True)
    mealTime = models.CharField(max_length=2, blank=True)  # 아침/점심/저녁/간식/야식
    foods = models.ManyToManyField(
        Food, related_name="foods", blank=True)  # 음식 이름, 칼로리, 영양성분(탄/단/지)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    totalCal = models.IntegerField(null=True)
    
class Menu2food(models.Model):
    image = models.ForeignKey(Menu,
                              on_delete=models.CASCADE)  # Menuid가 들어가는거
    food = models.ForeignKey(Food,
                             on_delete=models.CASCADE)  # food id가 들어가는거
    location = models.TextField(null=False)  # 좌상우하, 좌표값
