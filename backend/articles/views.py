from django.shortcuts import render
from . import models
from django.contrib.auth import get_user_model
from . import serializers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


# Create your views here.

def add_tag(request):
    #article이랑 똑같이 crudㄱ
    pass

def del_tag(request):
    #article이랑 똑같이 crudㄱ
    pass

User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request):
    new_article = serializers.ArticleSerializer(data=request.data)
    #태그는 string으로 받아서 split하기->for로 중복확인/저장(추가 필요)
    if new_article.is_valid(raise_exception=True):
        new_article.save(user=request.user)
        return Response(new_article.data)

@api_view(['GET'])
def articlesAll(request):
    #스크롤할 때마다 게시물 불러오기(추가 필요)
    articles = models.Article.objects.all()
    articles_All = []
    for article in articles:
        articles_All.append(serializers.ArticleSerializer(article).data)
    return Response(articles_All)

@api_view(['GET'])
def details(request, article_id):
    article = get_object_or_404(models.Article, pk=article_id)
    article_details = serializers.ArticleSerializer(article)
    return Response(article_details.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update(request, article_id):
    article = get_object_or_404(models.Article, pk=article_id)
    if article.user==request.user:
        up_article = serializers.ArticleSerializer(article, data=request.data)
        if up_article.is_valid(raise_exception=True):
            up_article.save(user=request.user)
            return Response(up_article.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete(request, article_id):
    article = get_object_or_404(models.Article, pk=article_id)
    if article.user==request.user or request.user.is_superuser:
        article.delete()
        return Response("게시글이 삭제되었습니다.")

@api_view(['GET'])
def commentsAll(request, article_id):
    article = get_object_or_404(models.Article, pk=article_id)
    comments = models.Comment.objects.order_by('-pk').filter(article=article)
    comments_All = []
    for comment in comments:
        comments_All.append(serializers.CommentSerializer(comment).data)
    return Response(comments_All)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request, article_id):
    article = get_object_or_404(models.Article, pk=article_id)
    new_comment = serializers.CommentSerializer(data=request.data)
    if new_comment.is_valid(raise_exception=True):
        new_comment.save(user=request.user, article=article)
        return Response(new_comment.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_comment(request, article_id, comment_id):
    article = get_object_or_404(models.Article, pk=article_id)
    comment = get_object_or_404(models.Comment, pk=comment_id)
    if comment.user==request.user:
        up_comment = serializers.CommentSerializer(comment, data=request.data)
        if up_comment.is_valid(raise_exception=True):
            up_comment.save(user=request.user, article=article)
            return Response(up_comment.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def del_comment(request, comment_id):
    comment = get_object_or_404(models.Comment, pk=comment_id)
    if comment.user==request.user or request.user.is_superuser:
        comment.delete()
        return Response("댓글이 삭제되었습니다.")


@api_view(['GET'])
def replysAll(request, comment_id):
    comment = get_object_or_404(models.Comment, pk=comment_id)
    replys = models.Reply.objects.order_by('-pk').filter(comment=comment)
    replys_All = []
    for reply in replys:
        replys_All.append(serializers.ReplySerializer(reply).data)
    return Response(replys_All)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_reply(request, comment_id):
    comment = get_object_or_404(models.Comment, pk=comment_id)
    new_reply= serializers.ReplySerializer(data=request.data)
    if new_reply.is_valid(raise_exception=True):
        new_reply.save(user=request.user, comment=comment)
        return Response(new_reply.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_reply(request, comment_id, reply_id):
    comment = get_object_or_404(models.Comment, pk=comment_id)
    reply = get_object_or_404(models.Reply, pk=reply_id)
    if reply.user==request.user:
        up_reply = serializers.ReplySerializer(reply, data=request.data)
        if up_reply.is_valid(raise_exception=True):
            up_reply.save(user=request.user, comment=comment)
            return Response(up_reply.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def del_reply(request, reply_id):
    reply = get_object_or_404(models.Reply, pk=reply_id)
    if reply.user==request.user or request.user.is_superuser:
        reply.delete()
        return Response("답글이 삭제되었습니다.")