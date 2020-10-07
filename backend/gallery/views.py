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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def saveMenu(request):
    new_menu = Menu()
    new_menu.user = request.user
    # type, fileName, data << 각각 프론트에서 보낼 수 있는 데이터
    decoded_data = base64.b64decode(request.data['data'])
    new_menu.image = ContentFile(
        decoded_data, name=f"{request.data['fileName']}")
    new_menu.save()
    return Response("파일을 저장했습니다.")
    # response = FileResponse(open(f"media/image/{request.data['fileName']}", 'rb'))
    # return response


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delImg(request, image_id):
    image = get_object_or_404(Menu, pk=image_id)
    if image.user == request.user or request.user.is_superuser:
        image.delete()
        return Response("이미지가 삭제되었습니다.")

# 내 사진 목록, 내 게시물 목록, 좋아하는 게시물 목록 처럼 사진만 나오는 경우 따로 api를 구현해야 할까?
# 일단 내 사진 목록에서 보여줄 용도로 하나 만들어보겠음


@api_view(['POST'])
@permission_classes([IsAuthenticated])
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getChart(request, date):
    Menus = Menu.objects.filter(user=request.user, created_at__contains=date)
    Send = {'TotalCal' : 0, 'Menus': {'아침':{}, '점심':{}, '저녁':{}, '간식':{}, '야식':{},}}
    # Send = {'TotalCal' : 0, }
    for i in range(len(Menus)):
        time = ['아침', '점심', '저녁', '간식', '야식']
        cnt = Menus[i].count
        for t in range(len(time)):
            if Menus[i].mealTime == time[t]:
                print(t, Menus[i].mealTime)
                food = Menus[i].food
                print(food)
                print(food.DESC_KOR)
                T, D, G = 0, 0, 0
                Send['Menus'][time[t]] = {}
                Send['Menus'][time[t]]['meal'] = []
                # for food in Foods:
                Send['Menus'][time[t]]['meal'].append([food.DESC_KOR, int(food.NUTR_CONT1)*cnt])
                T += int(food.NUTR_CONT2)*cnt
                D += int(food.NUTR_CONT3)*cnt
                G += int(food.NUTR_CONT4)*cnt
                print(T, D, G)
                total = T+D+G
                Send['Menus'][time[t]]['nutrient'] = [(T/total)*100, (D/total)*100, (G/total)*100]
                Send['Menus'][time[t]]['cnt'] = cnt
        Send['TotalCal'] += int(Menus[i].totalCal)*cnt
    print(Send)
    return Response(Send)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def plusCnt(request):
    print(request.data)
    d = request.data['date']
    mt = request.data['mealtime']
    selectedMenu = get_object_or_404(Menu, user=request.user, created_at__contains=d, mealTime=mt)
    selectedMenu.count += 1
    selectedMenu.save()
    print(selectedMenu.count)
    return Response('늘렸다')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def minusCnt(request):
    d2 = request.data['date']
    mt2 = request.data['mealtime']
    selectedMenu2 = get_object_or_404(Menu, user=request.user, created_at__contains=d2, mealTime=mt2)
    selectedMenu2.count -= 1
    selectedMenu2.save()
    print(selectedMenu2.count)
    return Response('줄었다')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteMenu(request):
    del_d = request.data['date']
    del_mt = request.data['mealtime']
    del_Menu = get_object_or_404(Menu, user=request.user, created_at__contains=del_d, mealTime=del_mt)
    del_Menu.delete()
    return Response("식단이 삭제되었습니다.")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCalendar(request):
    Menus = Menu.objects.filter(user=request.user)
    MenusDict = {}
    for i in range(len(Menus)):
        print(Menus[i].mealTime)
        created_at = str(Menus[i].created_at)
        if created_at.split()[0] not in MenusDict.keys():
            MenusDict[created_at.split()[0]] = [0, 0, 0, 0, 0, 0] # 아침, 점심, 저녁, 간식, 야식, 총칼로리
        if Menus[i].mealTime == '아침':
            MenusDict[created_at.split()[0]][0] += float(Menus[i].totalCal)
        elif Menus[i].mealTime == '점심':
            MenusDict[created_at.split()[0]][1] += float(Menus[i].totalCal)
        elif Menus[i].mealTime == '저녁':
            MenusDict[created_at.split()[0]][2] += float(Menus[i].totalCal)
        elif Menus[i].mealTime == '간식':
            MenusDict[created_at.split()[0]][3] += float(Menus[i].totalCal)
        elif Menus[i].mealTime == '야식':
            MenusDict[created_at.split()[0]][4] += float(Menus[i].totalCal)
        else:
            MenusDict[created_at.split()[0]][5] += float(Menus[i].totalCal)
    return Response(MenusDict)
