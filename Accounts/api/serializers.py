from django.contrib.auth.models import User
from rest_framework import serializers
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from Accounts.models import user_profile

from rest_framework.response import Response
from rest_framework import status
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

class user_creation_serializer(serializers.ModelSerializer):
    first_name = serializers.CharField(allow_blank=False)
    last_name = serializers.CharField(allow_blank=False)
    email = serializers.EmailField(allow_blank=False)
    year = serializers.CharField(allow_blank=False)
    contact = serializers.CharField(allow_blank=False)
    password = serializers.CharField( min_length=4, write_only=True,required=True,style={'input_type': 'password'})
    password2 = serializers.CharField( min_length=4, write_only=True,required=True,style={'input_type': 'password'})
    
    class Meta:
        model=User
        fields=['first_name', 'last_name', 'username', 'email', 'year', 'contact', 'password', 'password2']
        extra_kwargs = {
                'password':{'write_only':True}
            }
    def save(self):
        account = User(
            email = self.validated_data['email'],
            username= self.validated_data['username']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        
        if password != password2:
            raise serializers.validationError({'password':'passwords must match.'})
        account.set_password(password)
        account.save()
        profile = user_profile(
            name= self.validated_data['username'],
            email= self.validated_data['email'],
            contact= self.validated_data['contact'],
            year= self.validated_data['year'],
            user = account
        )
        profile.save()
        return (account,profile)
    
@receiver(post_save, sender= settings.AUTH_USER_MODEL)
def create_user_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


# create a class serializer for passwordresetview

class PasswordRestSerializer(serializers.Serializer):
    email = serializers.EmailField()
    
# create a class serializer of passwordresetconfirm view
class PasswordRestConfirmSerializer(serializers.Serializer):
    new_password1 = serializers.CharField( min_length=4, write_only=True,required=True,style={'input_type': 'password'})
    new_password2 = serializers.CharField( min_length=4, write_only=True,required=True,style={'input_type': 'password'})
    
    def new_password_validation(self):
        new_password1 = self.validated_data['new_password1']
        new_password2 = self.validated_data['new_password2']
        if new_password1 and new_password2:
            if new_password1 != new_password2:
              return Response({'error': 'Please provide both password must match'},status=HTTP_400_BAD_REQUEST)
            return new_password1

# password change serializer

class passwordChangeSerializer(serializers.Serializer):
    new_password1 = serializers.CharField( min_length=4, write_only=True,required=True,style={'input_type': 'password'})
    new_password2 = serializers.CharField( min_length=4, write_only=True,required=True,style={'input_type': 'password'})
    def new_password_validation(self):
        new_password1 = self.validated_data['new_password1']
        new_password2 = self.validated_data['new_password2']
        if new_password1 and new_password2:
            if new_password1 != new_password2:
              return Response({'error': 'Please provide both password must match'},status=HTTP_400_BAD_REQUEST)
            return new_password1
        


class user_profile_serializer(serializers.ModelSerializer):    
    class Meta:
        model=user_profile
        fields=['name', 'email', 'avatar', 'contact']