from django.conf.urls import url

from myAdmin.api.views import*

app_name = 'myAdmin'

urlpatterns = [
    url(r'^dashboard/$', dashboard_view, name="dashboard" ),

]