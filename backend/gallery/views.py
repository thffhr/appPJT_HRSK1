from django.shortcuts import render, get_object_or_404
from .models import Menu, KindOf
from .serializers import kindOfSerializer, MenueSerializer
from accounts.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.core.files.base import ContentFile
# from PIL import Image

import base64
# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def saveMenue(request):
    # image = ContentFile(request.data['file'])
    # new_menu = Menu()
    # new_menu.user = request.user
    # new_menu.image = request.data['file']
    # new_menu.save()
    print(request.POST)
    print(ContentFile(request.POST['file']))
    # decoded_data = base64.decodestring(request.data['file'][0])
    # print(decoded_data)
    return Response("파일이 저장되었습니다.")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delImg(request, image_id):
    image = get_object_or_404(Menu, pk=image_id)
    if image.user==request.user or request.user.is_superuser:
        image.delete()
        return Response("이미지가 삭제되었습니다.")

# 내 사진 목록, 내 게시물 목록, 좋아하는 게시물 목록 처럼 사진만 나오는 경우 따로 api를 구현해야 할까?
# 일단 내 사진 목록에서 보여줄 용도로 하나 만들어보겠음
@api_view(['GET'])
def myImgs(request):
    images = Menu.objects.order_by('-pk').filter(user=request.user)
    my_imgs = []
    for image in images:
        my_imgs.append(MenueSerializer(image).data)
    return Response(my_imgs)