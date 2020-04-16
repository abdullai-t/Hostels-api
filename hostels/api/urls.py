from django.conf.urls import url
from hostels.api.views import (location_creation_view, hostel_creation_view, 
                               room_creation_view, get_all_locations,
                               get_all_hostels,get_hostels_in_location,
                               get_rooms_in_hostel,
                               )


app_name = 'hostels'

urlpatterns = [
    # creation urls
    url(r'^create/hostel/$', hostel_creation_view, name="create_hostel" ),
    url(r'^create/location/$', location_creation_view, name="create_location" ),
    url(r'^create/room/$', room_creation_view, name="create_room" ),
    
    # query urls
    url(r'^locations/$', get_all_locations, name="all_locations" ),
    url(r'^hostels/$', get_all_hostels, name="all_hostels" ),
    url(r'^(?P<location>[\w-]+)/hostels/$', get_hostels_in_location, name="all_hostels_in_location" ),
    url(r'^(?P<hostel>[\w\s-]+)/rooms/$', get_rooms_in_hostel, name="all_rooms_in_hostel" ),
  


]