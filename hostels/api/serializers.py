from rest_framework import serializers
from hostels.models import *

class locationSerializer(serializers.ModelSerializer):
    class Meta:
        model= Location
        fields =['name', 'description', 'image']
        
class hostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = ['name', 'description', 'image']
        
class roomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['room_type', 'price']
        
        
class bookRoomSerializer(serializers.ModelSerializer):
    room = serializers.CharField(source='room.room_type', read_only=True)
    class Meta:
        model = BookRoom
        fields = ['room']