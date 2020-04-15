from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authtoken.models import Token
from Accounts.api.serializers import user_creation_serializer
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.core.mail import send_mail
from rest_framework.authentication import TokenAuthentication
from Accounts.api.serializers import PasswordRestConfirmSerializer, passwordChangeSerializer, user_profile_serializer
from django.core.validators import validate_email
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework.authtoken.models import Token
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

from Accounts.models import user_profile
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def registration_view(request):
    
    if request.method == "POST":
        serializer = user_creation_serializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account , profile = serializer.save()
            data['response'] = "successfully registered a new user"
            data['email'] = account.email
            data['username'] = account.username
            token = Token.objects.get(user=account).key
            data['token']= token
        else:

            data = serializer.errors
        return Response(data)
    

@api_view(["POST"])
def login(request):
    username  = request.data.get("username")
    password  = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},status=HTTP_400_BAD_REQUEST)
        
    user = authenticate(username=username, password=password)
    # login(request, user)

    if not user:
        return Response({'error': 'Invalid Credentials'}, status=HTTP_404_NOT_FOUND)
    # login(request, user)   
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},status=HTTP_200_OK)


    # password reset view
@api_view(['POST',])   
def PasswordRestView(request): 
    # checking the validity of the email entered by the user 
    def validate_email_address(email):
        try:
            # if email is valid the code should continue
            validate_email(email)
            return True
        except validationError:
            # else it should through error
            return False
        
    email  = request.data.get("email")
    
    # if the function for checking validity returns true, 
    if validate_email_address(email):
        # search in the database for user with that email
        user = User.objects.get(email=email)
        data = {}
        # if the user exist,
        if user:
            # encode the pk of that user 
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            # get the token of the user
            token = Token.objects.get(user=user)
            # email template('email/email_body.html') with parameters of user, uid, token .........
            msg_html = render_to_string('email/email_body.html', 
                                        {'user': user, 'domain': "http://127.0.0.1:8000", 
                                         'site_name':'Hostels' ,'uid':uid, 'token':token})
            
            # send email function
            send_mail(
                'Password reset for Hostels',
                 "",
                'some@sender.com',
                [user.email],
                html_message=msg_html,
            )
            # if email sending is successful, return success message and token
            data["success"]= "A reset link has been sent to your email. visit to reset your password"
            data['token']= token.key
        else:
            data["failure"] = "user can not be found"
    return Response(data)



@api_view(['POST',]) 
# password reset confirm view
def passwordResetConfirmView(request, uidb64, token):
    # putting data into PasswordRestConfirmSerializer for validity check
        serializer = PasswordRestConfirmSerializer(data=request.data)
        # decoding the uid parsed into the url to get the pk of the user
        uid = urlsafe_base64_decode(uidb64)
        # checking if there is a user with that pk
        user = User.objects.get(pk=uid)
        # get the token of that user
        check_token = Token.objects.get(user=user)
        data = {}
        # if the user exist and the token is the same as the one in parsed into the url, 
        if user and check_token:
            # check the validity of PasswordRestConfirmSerializer , if valid
            if serializer.is_valid():
                # there is a fuction in the PasswordRestConfirmSerializer serializer class
                # we assign new_password to the valid form of that function because it contains the new
                # password from the reset form
                new_password = serializer.new_password_validation()
                # overwriting the password filed of the user with the new password
                user.set_password(new_password)
                # delete the token of the user
                Token.objects.get(user=user).delete()
                # save the user instance 
                user.save()
                # create a new token for the user
                token = Token.objects.create(user=user)
                # return the token and the success message when everything is successful
                data["success"] = "your password has been successfully reset"
                data['token']= token.key
            else:
                data = serializer.error
        return Response(data)

@api_view(['POST',]) 
@authentication_classes([TokenAuthentication,])
@permission_classes([IsAuthenticated])
def passwordChangeView(request):
    user = request.user
    data = request.data
    serializer = passwordChangeSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        associated_user = User.objects.get(username=user)
        print("associated_user: ",associated_user)
        # password from the change form
        new_password = serializer.new_password_validation()
        # overwriting the password filed of the user with the new password
        associated_user.set_password(new_password)
        associated_user.save()
        token = Token.objects.get(user=user)
        # return the token and the success message when everything is successful
        data["success"] = "your password has been successfully changed"
        data['token']= token.key
    else:
        data = serializer.error
    return Response(data)


# user profile view
@api_view(['POST','GET']) 
@authentication_classes([TokenAuthentication,])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    if request.method =='GET':
        user = user_profile.objects.get(user=request.user)
        user_info = {
            'name':user.name,
            'email':user.email,
            'avatar':user.avatar,
            'contact':user.contact,
        }
        
        data={}
        if user:        
            serializer = user_profile_serializer(data=user_info)
            if serializer.is_valid():   
               return Response(serializer.data)
            else:
               data["error"] = "the data is invalid"
               return Response(data)
    else:
        user = user_profile.objects.get(user=request.user)
        serializer = user_profile_serializer(data=request.data, instance=user)
        data = {}
        if serializer.is_valid():
            serializer.save()

            data["success"] = "your info has been successfully updated"
        else:
            data["failure"] = "we could not update your info due to some errors"
            
        return Response(data)
        
            
        
                
                

            
        
    

