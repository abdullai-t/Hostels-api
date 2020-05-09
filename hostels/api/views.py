from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from hostels.models import Location, Hostel, Room, BookRoom
from rest_framework.generics import ListAPIView
from rest_framework.filters import SearchFilter, OrderingFilter

from hostels.api.serializers import locationSerializer,hostelSerializer, roomSerializer,bookRoomSerializer

# ######################### create Location requests ########################################################
# view for creating locations
@api_view(['POST',])
def location_creation_view(request):
    if request.method == "POST":
        serializer = locationSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

# ######################### create Hostel requests ########################################################

# view for creating hostels
@api_view(['POST',])
def hostel_creation_view(request):
    if request.method == "POST":
        location = Location.objects.get(name=request.data.get("location"))
        print(location)
        serializer = hostelSerializer(data = request.data)
        data={}
        if serializer.is_valid():
            serializer.save(location=location)
            data['location'] = location.name
            data['hostel'] = serializer.data
            return Response(data)
        else:
            data['error']= "the form is invalid"
            return Response(data)
        
  # ######################### create Room requests ########################################################      
        
# view for creating rooms
@api_view(['POST',])
def room_creation_view(request):
    if request.method == "POST": 
        data = {}
        hostel = Hostel.objects.get(name=request.data.get("hostel"))
        if hostel:
            serializer = roomSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(hostel=hostel)
                data['hostel'] = hostel.name
                data['room'] = serializer.data
            else:
                data['failure'] = "the data is invalid"
            return Response(data)
        else:
            data['error'] = "the hostel you chose doesnot exist in database."
            return Response(data)
        
# ############################### book room request ###################################################
@api_view(['POST',])
@authentication_classes([TokenAuthentication,])
@permission_classes([IsAuthenticated])
def book_room_view(request):
    if request.method == "POST":
        user = User.objects.get(username=request.user)
        hostel = Hostel.objects.get(name=request.data.get("hostel"))
        room_type = request.data.get("room")
        room = Room.objects.get(room_type=room_type, hostel__pk=hostel.pk)
        data={}
        serializer = bookRoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user, room=room)
            return Response(serializer.data)
        else:
            data["failure"] = "the data is invalid"
            return Response(data)
        
        

        
# ++++++++++++++++++++++++++++++++++++end of creations +++++++++++++++++++++++++++++++++++++++++++++++++++


# ######################### Get requests ########################################################

# get all locations
# @api_view(['GET',])
# @authentication_classes([TokenAuthentication,])
# @permission_classes([IsAuthenticated])
# def get_all_locations(request):
#     if request.method == "GET":
#         locations = Location.objects.all()
#         serializer = locationSerializer(locations, many=True)
#         return Response(serializer.data)
    
class get_all_locations(ListAPIView):
    queryset = Location.objects.all()
    serializer_class = locationSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    # filter_backends = (SearchFilter, OrderingFilter)
    # search_fields = ('name', 'location__name')
        
    

# get all hostels
class hostels_api_listView(ListAPIView):
    queryset = Hostel.objects.all()
    serializer_class = hostelSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('name', 'location__name')


# get all hostels in a specific location
@api_view(['GET',])
def get_hostels_in_location(request,location):
        try:
           hostels = Hostel.objects.filter(location__name=location)
        except Hostel.DoesNotExist:
          return Response(status= status.HTTP_404_NOT_FOUND)
        serializer = hostelSerializer(hostels, many=True)
        return Response(serializer.data)

# get all rooms in a specific hostel
@api_view(['GET',])
def get_rooms_in_hostel(request,hostel):
        try:
           rooms = Room.objects.filter(hostel__name=hostel)
        except Room.DoesNotExist:
          return Response(status= status.HTTP_404_NOT_FOUND)
        data = {}
        serializer = roomSerializer(rooms, many=True)
        data['room'] = serializer.data
        return Response(data)


# get all booked rooms by a user
@api_view(['GET',])
@authentication_classes([TokenAuthentication,])
@permission_classes([IsAuthenticated])
def get_user_booked_rooms(request):
    user = User.objects.get(username=request.user)
    booked_rooms = BookRoom.objects.filter(user__username=user)
    serializer = bookRoomSerializer(booked_rooms, many=True)
    return Response(serializer.data)

        
    
    

# view for budget page
class budget_api_listView(ListAPIView):
    queryset = Room.objects.all()
    serializer_class = roomSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('price', 'room_type')

        