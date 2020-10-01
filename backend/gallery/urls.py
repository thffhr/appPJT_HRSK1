from django.urls import path
from . import views

app_name="gallery"

urlpatterns = [
    path('saveMenue/', views.saveMenue, name='saveMenue'),
    path('<int:image_id>/delImg/', views.delImg, name='delImg'),
    path('myImgs/', views.myImgs, name='myImgs'),
]