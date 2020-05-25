from django.conf.urls import url

from myAdmin.api.views import*

app_name = 'myAdmin'

urlpatterns = [
    url(r'^admin-login/$', admin_login, name="admin-login" ),
    url(r'^dashboard/$', dashboard_view, name="dashboard" ),
    url(r'^pi-data/$', PieCartData, name="PieCartData" ), 
    url(r'^hostel-location/$', hostels_in_location_chart, name="PieCartData" ), 
    url(r'^user-hostel/$', users_in_hostels_chart, name="PieCartData" ),

]