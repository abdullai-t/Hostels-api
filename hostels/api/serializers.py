from rest_framework import serializers
from hostels.models import *

class locationSerializer(serializers.ModelSerializer):
    class Meta:
        model= Location
        fields =['name', 'description', 'image']
        
class hostelSerializer(serializers.ModelSerializer):
    location = locationSerializer()
    class Meta:
        model = Hostel
        fields = ['name', 'description', 'image', 'location']
        
class roomSerializer(serializers.ModelSerializer):
    hostel = hostelSerializer()
    class Meta:
        model = Room
        fields = ['room_type', 'price', 'hostel']
        
        
class bookRoomSerializer(serializers.ModelSerializer):
    room = roomSerializer()
    class Meta:
        model = BookRoom
        fields = ['room']