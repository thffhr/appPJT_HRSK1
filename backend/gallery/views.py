from django.shortcuts import render, get_object_or_404
from .models import Menu
from .models import Menu2food
from .models import Food

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
import cv2
import numpy as np
from matplotlib import pyplot as plt


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def saveMenu(request):
    def predict_img(uri):
        net = cv2.dnn.readNet("yolov2-food100.weights", "yolo-food100.cfg")
        classes = []
        with open("food100.names", "r") as f:
            classes = [line.strip() for line in f.readlines()]
        layer_names = net.getLayerNames()
        output_layers = [layer_names[i[0] - 1]
                         for i in net.getUnconnectedOutLayers()]
        colors = np.random.uniform(0, 255, size=(len(classes), 3))

        img_path = uri
        img = cv2.imread(img_path)
        height, width, channels = img.shape

        blob = cv2.dnn.blobFromImage(
            img, 0.00392, (416, 416), (0, 0, 0), True, crop=True)  # 네트워크에 넣기 위한 전처리
        net.setInput(blob)  # 전처리된 blob 네트워크에 입력
        outs = net.forward(output_layers)  # 결과 받아오기

        class_ids = []
        confidences = []
        boxes = []
        for out in outs:
            for detection in out:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
                if confidence > 0.3:
                    # 탐지된 객체의 너비, 높이 및 중앙 좌표값 찾기
                    center_x = int(detection[0] * width)
                    center_y = int(detection[1] * height)
                    # print(center_x,center_y)
                    # w = abs(int(detection[2] * width))
                    h = abs(int(detection[3] * height))
                    # print(w,h)
                    # 객체의 사각형 테두리 중 좌상단 좌표값 찾기
                    x = abs(int(center_x - w / 2))
                    y = abs(int(center_y - h / 2))
                    boxes.append([x, y, w, h])
                    confidences.append(float(confidence))
                    class_ids.append(class_id)
        # Non Maximum Suppression (겹쳐있는 박스 중 confidence 가 가장 높은 박스를 선택)
        indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.3, 0.3)
        # 최종적으로 indexes에 음식에 매치된 번호가 들어감 boxes에는 검출돤 하나의 음식에 대한 좌표
        font = cv2.FONT_HERSHEY_PLAIN
        det_foods = []
        for i in range(len(boxes)):  # 검출된 음식 개수만큼 돔
            if i in indexes:  # i에 검출된 음식 번호
                x, y, w, h = boxes[i]
                class_name = classes[class_ids[i]]
                label = f"{class_name} {boxes[i]}"
                det_foods.append(label)
                # print(class_name) # 검출된 음식 이름 ex) pizza ..
                # print(confidences[i]) #검출된 확률
                color = colors[i]
                # 사각형 테두리 그리기 및 텍스트 쓰기
                cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
                cv2.rectangle(img, (x - 1, y),
                              (x + len(class_name) * 13, y - 12), color, -1)
                cv2.putText(img, class_name, (x, y - 4),
                            cv2.FONT_HERSHEY_COMPLEX_SMALL, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
        # 리스트 형식으로 반환
        # 사진은 반환 어케?
        return det_foods, img  # 여기서 img는 사용자에게 뿌릴 이미지

    new_menu = Menu()
    new_menu.user = request.user
    # type, fileName, data << 각각 프론트에서 보낼 수 있는 데이터
    decoded_data = base64.b64decode(request.data['data'])
    new_menu.image = ContentFile(
        decoded_data, name=f"{request.data['fileName']}")  # url
    print(type(new_menu.image))
    # predict_img(new_menu.image)
    new_menu.save()  # insert

    foodlist, img = predict_img('media/' + str(new_menu.image))
    print(foodlist)
    my_dict={}
    # menu2food에 값넣기
    for i in range(len(foodlist)):
        idx = foodlist[i].find("[")
        new_food = Menu2food()
        kfoodName = 
        input_menu = get_object_or_404(Menu, id=new_menu.id)
        foods = get_object_or_404(Food, DESC_KOR=kfoodName)
        # new_food.food 는 같은 이름 찾아서 넣어야댐
        new_food.location = foodlist[i][idx:]  # 좌표값
        new_food.save(image=input_menw, food=foods)

    # predict = predict_img('media/' + str(new_menu.image)) #db 저장 위치
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
