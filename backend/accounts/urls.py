from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    # path('superuser/', views.superuser, name='superuser'),
    path('profile/<str:username>/', views.profile, name='profile'),
    path('profile/update/',
         views.update_info, name='update_info'),
    path('profile/<str:username>/follow/', views.follow, name='follow'),
    path('profile/<str:username>/isfollow/', views.isfollow, name='isfollow'),
    # path('config/', views.config, name='config'),
    path('delete/<str:username>', views.userdelete, name='userdelete'),
    # path('recommend/<str:username>/', views.recommend, name='recommend'),
]
