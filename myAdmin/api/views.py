from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from hostels.models import Location, Hostel, Room, BookRoom
from rest_framework.generics import ListAPIView
from rest_framework.filters import SearchFilter, OrderingFilter

from hostels.api.serializers import *

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