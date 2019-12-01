from django.db import models

STATUS_CHOICES = ('FOR_SALE', 'JUST_LISTED', 'OUT_OF_STOCK', 'DEMOLITION', 'SOLD')
HAS_CHOICES = ('Sim', 'Não')
CURRENT_PHASE = ('final_details', 'set_up', 'finishments', 'ready_to_move', 'demolition')
PHOTO_TYPES = ('facade', 'master_bedroom', 'living', 'bathroom', 'kitchen')

PHOTO_TYPES_MAP = {
    'Cozinha': 'kitchen',
    'Fachada': 'facade',
    'Quarto': 'master_bedroom',
    'Sala de Estar': "living",
    'Banheiro': 'bathroom'
}


# Create your models here.
class Place(models.Model):
    # Not database id, but what the Loft API gives us
    # Use this to find the apartment in their system if you want to.
    place_id = models.CharField(max_length=20)

    status = models.CharField(max_length=50)

    # What the Loft API gives us
    # Use this to find the apartment in their system if you want to.
    unit_id = models.IntegerField()

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
    current_phase = models.CharField(max_length=50)

    # 'Sim' or 'Não'
    # has_balcony = models.CharField(max_length=20)
    # 'Sim' or 'Não'
    # has_lavatory = models.CharField(max_length=20)

    # Amenities
    has_power_generator = models.BooleanField()
    has_gourmet = models.BooleanField()
    has_green_area = models.BooleanField()
    has_grill = models.BooleanField()
    has_gym = models.BooleanField()
    has_heated_pool = models.BooleanField()
    has_kids = models.BooleanField()
    has_party_room = models.BooleanField()
    has_play_game = models.BooleanField()
    has_playground = models.BooleanField()
    has_pool = models.BooleanField()
    has_court = models.BooleanField()  # Sports Court

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

    def order_photo(self, order):
        all_photos = self.photo.all()
        photo_list = list()

        ([photo_list.append(photo.get_formatted_url()) for photo in
          all_photos.filter(photo_type=PHOTO_TYPES_MAP.get(order[0]))])
        ([photo_list.append(photo.get_formatted_url()) for photo in
          all_photos.filter(photo_type=PHOTO_TYPES_MAP.get(order[1]))])
        ([photo_list.append(photo.get_formatted_url()) for photo in
          all_photos.filter(photo_type=PHOTO_TYPES_MAP.get(order[2]))])
        ([photo_list.append(photo.get_formatted_url()) for photo in
          all_photos.filter(photo_type=PHOTO_TYPES_MAP.get(order[3]))])
        ([photo_list.append(photo.get_formatted_url()) for photo in
          all_photos.filter(photo_type=PHOTO_TYPES_MAP.get(order[4]))])
        return photo_list


class Photo(models.Model):

    place = models.ForeignKey(Place, related_name='photo', on_delete=models.CASCADE)

    # facade, master_bedroom, living, bathroom, kitchen
    photo_type = models.CharField(max_length=50)

    path = models.CharField(max_length=100)

    def get_formatted_url(self):
        return 'https://content.loft.com.br/homes/{}/desktop_{}'.format(self.place.place_id, self.path)


class Saved(models.Model):

    cookie = models.CharField(max_length=50, db_index=True)
    places = models.ManyToManyField(Place, related_name='favorite')

    @staticmethod
    def get_or_create(cookie):
        saved = Saved.objects.filter(cookie=cookie).last()

        return saved if saved else Saved.objects.create(cookie=cookie)
