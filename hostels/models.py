# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.conf import settings

class Location(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    image = models.ImageField(upload_to='location')
    
    def __str__(self):
         return self.name
    def natural_key(self):
        return (self.name)

     
    def snippet(self):
         return self.description[:200]+ '...'
    


class Hostel(models.Model):
    location = models.ForeignKey(Location, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField()
    contact = models.CharField(max_length=10,blank=True, null=True)
    image = models.ImageField(upload_to='hostel') 
    
    def __str__(self):
         return self.name
    

    def natural_key(self):
        return (self.name, self.image.url)

     
    def snippet(self):
         return self.description[:200]+ '...'

class Room(models.Model):
     roomType  = (
          ('1 in 1', '1 in 1'),
          ('2 in 1', '2 in 1'),
          ('3 in 1', '3 in 1'),
          ('4 in 1', '4 in 1'),
     )
     hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE) 
     room_type = models.CharField(blank=True, null=True, max_length=100, choices =roomType)
     price = models.IntegerField(blank=True, null=True)
     
     
     def __str__(self):
         return self.room_type+'->'+ str(self.hostel)
    
    
class BookRoom(models.Model):
     user = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.CASCADE)
     room = models.ForeignKey(Room,blank=True, null=True, on_delete=models.CASCADE)
     def __str__(self):
         return self.user.username
     