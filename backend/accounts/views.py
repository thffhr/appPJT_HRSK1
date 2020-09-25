from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
# from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.contrib.auth import get_user_model
from django.contrib.auth import login as auth_login, logout as auth_logout, get_user_model

from django.contrib.auth.decorators import login_required
from .serializers import UserSerializer
from django.http import HttpResponse
import json
# from rest_framework.serializers import ModelSerializer

# from django.views.decorators.csrf import csrf_exempt
# from articles.models import Article

User = get_user_model()

# Create your views here.
# @csrf_exempt


class Result():
    def __init__(self):
        self.data = ''


@api_view(['GET'])
def profile(request, username):
    # user = get_object_or_404(User, uid=user_id)
    # articles = Article.objects.filter(user=user.id)
    user = get_object_or_404(User, username=username)
    serializer = UserSerializer(user)

    return Response(serializer.data)
    # return Response(context)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def need(request):
    user = get_object_or_404(User, id=request.user.id)
    save_data = request.data
    if save_data['sex'] == 'male':
        basal_metabolism = 1500
    elif save_data['sex'] == 'female':
        basal_metabolism = 1000

    save_data['basal_metabolism'] = int(basal_metabolism)
    serializer = UserSerializer(user, data=save_data, partial=True)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def need_info(request):
    print(request.data)
    user = get_object_or_404(User, id=request.user.id)
    save_data = request.data
    if user.sex == 'male':
        basal_metabolism = 66.47 + \
            (13.75 * int(save_data['weight'])) + (5 *
                                                  int(save_data['height'])) - (6.76 * int(save_data['age']))
    elif user.sex == 'female':
        basal_metabolism = 655.1 + \
            (9.56 * int(save_data['weight'])) + (1.85 *
                                                 int(save_data['height'])) - (4.68 * int(save_data['age']))

    if save_data['active'] == 'high':
        basal_metabolism *= 1.1
    elif save_data['active'] == 'normal':
        pass
    elif save_data['active'] == 'low':
        basal_metabolism *= 0.9

    save_data['basal_metabolism'] = int(basal_metabolism)
    serializer = UserSerializer(user, data=save_data, partial=True)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_info(request):
    user = get_object_or_404(User, id=request.user.id)
    save_data = request.data
    if save_data['sex'] == 'male':
        basal_metabolism = 66.47 + \
            (13.75 * save_data['weight']) + (5 *
                                             save_data['height']) - (6.76 * save_data['age'])
    elif save_data['sex'] == 'female':
        basal_metabolism = 655.1 + \
            (9.56 * save_data['weight']) + (1.85 *
                                            save_data['height']) - (4.68 * save_data['age'])

    if save_data['active'] == 'high':
        basal_metabolism *= 1.1
    elif save_data['active'] == 'normal':
        pass
    elif save_data['active'] == 'low':
        basal_metabolism *= 0.9

    save_data['basal_metabolism'] = int(basal_metabolism)
    serializer = UserSerializer(user, data=save_data, partial=True)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def userdelete(request, username):
    user = get_object_or_404(User, username=username)
    if request.method == 'POST':
        user.delete()
        # request.user.delete()
        return Response('탈퇴하였습니다.')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow(request, username):
    user = get_object_or_404(User, username=username)
    if user != request.user:
        if user.followers.filter(id=request.user.id).exists():
            user.followers.remove(request.user)
            request.user.followings.remove(user)

            result = {"result": "팔로우 실패"}
            result = json.dumps(result)
            return HttpResponse(result, content_type=u"application/json; charset=utf-8")

        else:
            user.followers.add(request.user)
            request.user.followings.add(user)

            result = {"result": "팔로우 성공"}
            result = json.dumps(result)
            return HttpResponse(result, content_type=u"application/json; charset=utf-8")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def isfollow(request, username):
    user = get_object_or_404(User, username=username)
    if user.followers.filter(id=request.user.id).exists():
        result = {"follow": "True"}
        result = json.dumps(result)
        return HttpResponse(result, content_type=u"application/json; charset=utf-8")
    else:
        result = {"follow": "False"}
        result = json.dumps(result)
        return HttpResponse(result, content_type=u"application/json; charset=utf-8")
