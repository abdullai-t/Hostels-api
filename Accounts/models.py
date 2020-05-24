from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class user_profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50,blank=True, null=True)
    email = models.EmailField(max_length=254, blank=True, null=True)
    avatar = models.ImageField(upload_to='profiles', blank=True, null=True, default='1.svg')
    year = models.CharField( max_length=50, blank=True, null=True)
    contact = models.CharField( max_length=50, blank=True, null=True)
    
    def __str__(self):
        return self.name
    
    
    
    