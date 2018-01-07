from django.contrib.auth.hashers import make_password
# from django.contrib.auth.models import User
from rest_framework import generics
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission

from profiles.models import User
from profiles.permissions import IsOwnerOrReadOnly
from profiles.serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
    })


class UserList(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)

    queryset = User.objects.all()
    serializer_class = UserSerializer
    def perform_create(self, serializer):
        password = make_password(self.request.data['password'])
        serializer.save(password=password)


class UserDetail(generics.RetrieveAPIView):
    permission_classes = (IsOwnerOrReadOnly,)

    queryset = User.objects.all()
    serializer_class = UserSerializer
