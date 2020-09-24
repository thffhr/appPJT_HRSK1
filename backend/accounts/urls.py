from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    # path('superuser/', views.superuser, name='superuser'),
    path('profile/<int:user_id>/', views.profile, name='profile'),
    path('profile/update/',
         views.update_info, name='update_info'),
    path('profile/<int:user_id>/follow/', views.follow, name='follow'),
    path('profile/<int:user_id>/isfollow/', views.isfollow, name='isfollow'),
    path('need/', views.need, name='need')
    # path('config/', views.config, name='config'),
    # path('delete/<int:user_id>/', views.userdelete, name='userdelete'),
    # path('recommend/<str:username>/', views.recommend, name='recommend'),
]
