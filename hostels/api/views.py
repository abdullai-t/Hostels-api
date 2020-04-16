from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from hostels.models import Location, Hostel, Room

from hostels.api.serializers import locationSerializer,hostelSerializer, roomSerializer

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

        
# ++++++++++++++++++++++++++++++++++++end of creations +++++++++++++++++++++++++++++++++++++++++++++++++++


# ######################### Get requests ########################################################

# get all locations
@api_view(['GET',])
def get_all_locations(request):
    if request.method == "GET":
        locations = Location.objects.all()
        serializer = locationSerializer(locations, many=True)
        return Response(serializer.data)
        
    

# get all hostels
@api_view(['GET',])
def get_all_hostels(request):
    if request.method == "GET":
        hostels = Hostel.objects.all()
        serializer = hostelSerializer(hostels, many=True)
        return Response(serializer.data)


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
        data['hostel'] = hostel
        data['room'] = serializer.data
        return Response(data)


# get all booked rooms by a user
  