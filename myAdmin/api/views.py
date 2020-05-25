from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from hostels.models import Location, Hostel, Room, BookRoom
from rest_framework.generics import ListAPIView
from rest_framework.filters import SearchFilter, OrderingFilter

from django.db.models import Count
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from hostels.api.serializers import *
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

@api_view(['GET',])
def dashboard_view(request):
    users = User.objects.filter(is_superuser=False).count()
    hostels = Hostel.objects.all().count()
    locations = Location.objects.all().count()
    booked_rooms = BookRoom.objects.all().count()
    # leader board
    booked_rooms_leatherboard = BookRoom.objects.all().order_by('-id')[:10]
    serializer = bookRoomSerializer(booked_rooms_leatherboard, many=True)
    
    # by room type
    one = BookRoom.objects.filter(room__room_type='1 in 1').count()
    two = BookRoom.objects.filter(room__room_type='2 in 1').count()
    three = BookRoom.objects.filter(room__room_type='3 in 1').count()
    four = BookRoom.objects.filter(room__room_type='4 in 1').count()
    
    roomType = {
        'one':one,
        'two':two,
        'three':three,
        'four':four
    }
    
    
    
    
    data = {}
    data['users']=users
    data['hostels']= hostels
    data['locations'] =locations
    data['roomsChart'] = roomType
    data['bookedRooms'] = booked_rooms
    data['leatherboard'] = serializer.data
    return Response(data)


@api_view(['GET',])
def PieCartData(request):
    
    # by room type
    one = BookRoom.objects.filter(room__room_type='1 in 1').count()
    two = BookRoom.objects.filter(room__room_type='2 in 1').count()
    three = BookRoom.objects.filter(room__room_type='3 in 1').count()
    four = BookRoom.objects.filter(room__room_type='4 in 1').count()
    
    first = User.objects.filter(user_profile__year="1st year").count()
    second = User.objects.filter(user_profile__year="2nd year").count()
    third = User.objects.filter(user_profile__year="3rd year").count()
    fourth = User.objects.filter(user_profile__year="4th year").count()
    
    
    
    roomType = {
        'one':one,
        'two':two,
        'three':three,
        'four':four
    }
    
    userChart = {
        'one':first,
        'two':second,
        'three':third,
        'four':fourth
    }
    
    data = {}
    data['roomsChart'] = roomType
    data['userChart']=userChart
    
    return Response(data)

@api_view(['GET',])
def hostels_in_location_chart(request):
    hostel = Hostel.objects.values('location__name').annotate(Count('location'))
    
    data = {}
    data['hostels']=hostel

    
    return Response(data)


@api_view(['GET',])
def users_in_hostels_chart(request):
    user = BookRoom.objects.values('room__hostel__name').annotate(Count('user'))
    
    data = {}
    data['users']=user

    
    return Response(data)

@api_view(['Post',])
def admin_login(request):
    username  = request.data.get("username")
    password  = request.data.get("password")

    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},status=HTTP_400_BAD_REQUEST)
    
    user = authenticate(request,username=username, password=password)
    if user.is_superuser:
        token= Token.objects.get(user=user).key
        return Response({'token': token},status=HTTP_200_OK)
    else:
        return Response({'error': 'Invalid Credentials'}, status=HTTP_404_NOT_FOUND) 
        
    
    return Response(data)

