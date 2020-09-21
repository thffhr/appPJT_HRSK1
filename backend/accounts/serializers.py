from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'password', 'height', 'weight',
                  'age', 'sex', 'active', 'basal_metabolism']
