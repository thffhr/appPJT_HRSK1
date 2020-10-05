from django.shortcuts import render, get_object_or_404
from .models import Menu
from .serializers import MenuSerializer
from accounts.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from django.core.files.base import ContentFile
# from PIL import Image

import base64
# from django.http import FileResponse
# Create your views here.
from keras.models import load_model
from keras.preprocessing import image
import numpy as np


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def saveMenu(request):
    def predict_img(uri):
        def preprocess_input(x):
            x_copy = np.copy(x)
            x_copy = x_copy.astype('float32')
            x_copy = x_copy*1./255
            return x_copy

        model = load_model('inceptionv3_multiclass_best.h5')

        img_path = uri
        img = image.load_img(img_path, target_size=(
            299, 299))  # input 사이즈에 맞게 변환

        x = image.img_to_array(img)
        x = preprocess_input(x)
        x = np.expand_dims(x, axis=0)

        r = open('label.txt', mode='rt', encoding='utf-8')
        lines = r.readlines()
        results = []
        for line in lines:
            results.append(line[12:])

        res = model.predict(x)
        top_label_ix = np.argmax(res)
        print('최고점수:', res[0][top_label_ix])
        print('적중음식:', results[top_label_ix])
        ord = np.argsort(res)[0][::-1]

        # for i in range(5):
        #     print(results[ord[i]][:-2])
        return results[ord[0]][:-2]

    new_menu = Menu()
    new_menu.user = request.user
    # type, fileName, data << 각각 프론트에서 보낼 수 있는 데이터
    decoded_data = base64.b64decode(request.data['data'])
    new_menu.image = ContentFile(
        decoded_data, name=f"{request.data['fileName']}")
    print(type(new_menu.image))
    # predict_img(new_menu.image)
    new_menu.save()
    predict = predict_img('media/' + str(new_menu.image))
    print(predict)
    return Response("파일을 저장했습니다.")
    # response = FileResponse(open(f"media/image/{request.data['fileName']}", 'rb'))
    # return response


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def delImg(request, image_id):
    image = get_object_or_404(Menu, pk=image_id)
    if image.user == request.user or request.user.is_superuser:
        image.delete()
        return Response("이미지가 삭제되었습니다.")

# 내 사진 목록, 내 게시물 목록, 좋아하는 게시물 목록 처럼 사진만 나오는 경우 따로 api를 구현해야 할까?
# 일단 내 사진 목록에서 보여줄 용도로 하나 만들어보겠음


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def myImgs(request):
    images = Menu.objects.order_by('-pk').filter(user=request.user)
    my_imgs = []
    for image in images:
        my_imgs.append(MenuSerializer(image).data)
    return Response(my_imgs)


def getImage(request, uri):
    images = []
    data = open('media/image/' + uri, "rb").read()
    images.append(data)
    return HttpResponse(images, content_type="image/png")


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def getChart(request):
    Menus = Menu.objects.filter(user=request.user)
    for i in range(len(Menus)):
        Foods = Menus[i].foods
        for food in Foods:
            print(food.DESC_KOR)
    return Response('보냈당')


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def getCalendar(request):
    Menus = Menu.objects.filter(user=request.user)
    MenusDict = {}
    for i in range(len(Menus)):
        print(Menus[i].mealTime)
        created_at = str(Menus[i].created_at)
        if created_at.split()[0] not in MenusDict.keys():
            # 아침, 점심, 저녁, 간식, 야식, 총칼로리
            MenusDict[created_at.split()[0]] = [0, 0, 0, 0, 0, 0]
        if Menus[i].mealTime == '아침':
            MenusDict[created_at.split()[0]][0] += Menus[i].totalCal
        elif Menus[i].mealTime == '점심':
            MenusDict[created_at.split()[0]][1] += Menus[i].totalCal
        elif Menus[i].mealTime == '저녁':
            MenusDict[created_at.split()[0]][2] += Menus[i].totalCal
        elif Menus[i].mealTime == '간식':
            MenusDict[created_at.split()[0]][3] += Menus[i].totalCal
        else:
            MenusDict[created_at.split()[0]][4] += Menus[i].totalCal
    return Response(MenusDict)
