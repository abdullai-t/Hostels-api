from rest_framework import serializers
from hostels.models import *
from django.contrib.auth.models import User

class locationSerializer(serializers.ModelSerializer):
    class Meta:
        model= Location
        fields =['name', 'description', 'image']
        
class hostelSerializer(serializers.ModelSerializer):
    location = locationSerializer(read_only=True)
    class Meta:
        model = Hostel
        fields = ['name', 'description', 'contact','image', 'location']
        
class roomSerializer(serializers.ModelSerializer):
    hostel = hostelSerializer(read_only=True)
    class Meta:
        model = Room
        fields = ['id','room_type', 'price', 'hostel']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id')
        read_only_fields = ('account_name',)
        
        
class bookRoomSerializer(serializers.ModelSerializer):
    room = roomSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = BookRoom
        fields = ['room', 'user']