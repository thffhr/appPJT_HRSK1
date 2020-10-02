from django.db import models
from django.conf import settings

# Create your models here.


class KindOf(models.Model):
    kindOf_name = models.CharField(max_length=20)


class Menu(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    image = models.FileField(upload_to="image", null=True)
    # kindOf = models.ForeignKey(KindOf, on_delete=models.PROTECT) #한식, 일식, 중식...
    # foods = models.ManyToManyField(Food, related_name="foods")
    # created_at = models.DateTimeField(auto_now_add=True)
