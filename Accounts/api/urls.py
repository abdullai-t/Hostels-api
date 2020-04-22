from django.conf.urls import url
from Accounts.api.views import (registration_view, 
                                login_view, PasswordRestView,
                                 passwordResetConfirmView, 
                                 passwordChangeView,
                                 user_profile_view,)


app_name = 'Accounts'

urlpatterns = [
        url(r'^login/$', login_view, name="login" ),
        url(r'^register/$', registration_view, name="register" ),
        url(r'^password/reset/$', PasswordRestView, name="password_reset" ),
        url(r'^reset/(?P<uidb64>[\w-]+)/(?P<token>[\w-]+)/$', passwordResetConfirmView, name="password_reset_confirm" ),
        url(r'^password/change/$', passwordChangeView, name="password_change" ),
        url(r'^account/settings/$', user_profile_view, name="account_settings" ),

]
