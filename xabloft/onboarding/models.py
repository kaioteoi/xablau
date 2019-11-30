from django.db import models

STATUS_CHOICES = ('FOR_SALE', 'JUST_LISTED', 'OUT_OF_STOCK', 'DEMOLITION', 'SOLD')
HAS_CHOICES = ('Sim', 'Não')
CURRENT_PHASE = ('final_details', 'set_up', 'finishments', 'ready_to_move', 'demolition')


# Create your models here.
class Place(models.Model):
    # Not database id, but what the Loft API gives us
    # Use this to find the apartment in their system if you want to.
    place_id = models.CharField(max_length=20, unique=True)

    status = models.CharField(choices=STATUS_CHOICES)

    # What the Loft API gives us
    # Use this to find the apartment in their system if you want to.
    unit_id = models.IntegerField(unique=True)

    bedrooms = models.IntegerField()

    # DEVE SER SUíTE, LOL
    suits = models.IntegerField()

    # How many parking spots
    parking_spots = models.IntegerField()
    floor = models.IntegerField()

    # Payment info
    complex_fee = models.IntegerField()
    property_tax = models.IntegerField()
    price = models.IntegerField()

    description = models.CharField(max_length=1024)
    current_phase = models.CharField(choices=CURRENT_PHASE)

    # 'Sim' or 'Não'
    # has_balcony = models.CharField(max_length=20)
    # 'Sim' or 'Não'
    # has_lavatory = models.CharField(max_length=20)

    # Amenities
    power_generator = models.BooleanField()
    gourmet = models.BooleanField()
    green_area = models.BooleanField()
    grill = models.BooleanField()
    gym = models.BooleanField()
    heated_pool = models.BooleanField()
    kids = models.BooleanField()
    party_room = models.BooleanField()
    play_game = models.BooleanField()
    playground = models.BooleanField()
    pool = models.BooleanField()
    court = models.BooleanField()  # Sports Court

    # Address
    # Full address would be like: type + name
    street_name = models.CharField(max_length=50)
    street_type = models.CharField(max_length=50)
    number = models.IntegerField()
    neighborhood = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=10)
    lat = models.CharField(max_length=30)
    lng = models.CharField(max_length=30)
