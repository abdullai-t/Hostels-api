from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Location, Hostel,Room, BookRoom

admin.site.register(Location),
admin.site.register(Hostel),
admin.site.register(Room)
admin.site.register(BookRoom)
