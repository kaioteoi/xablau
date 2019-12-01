import json
import requests
import urllib
from decimal import Decimal

import geopy.distance
from django.http import HttpResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt

from onboarding.models import Saved
from .models import Place


LOCATIONIQ_URL = 'https://locationiq.org/v1/search.php?'
locationiq_request = {
    'key': 'dda4e5240ffa57',
    'format': 'json',
}


@csrf_exempt
def onboarding_submission(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        location = data.get('location')
        distance = data.get('distance')

        locationiq_request['q'] = location
        max_dist = distance and int(distance)
        resp = requests.get(LOCATIONIQ_URL + urllib.parse.urlencode(locationiq_request)).json()

        if len(resp) > 0:
            coords_1 = (resp[0]['lat'], resp[0]['lon'])

            places = []
            for p in Place.objects.filter(status__in=['FOR_SALE', 'JUST_LISTED']):
                coords_2 = (p.lat, p.lng)
                dist = geopy.distance.geodesic(coords_1, coords_2).km * 12
                if dist <= max_dist:
                    place = model_to_dict(p)
                    place['distance'] = dist
                    place['photos'] = p.order_photo(data['orderRoom'].split(','))
                    places.append(place)

            places = sorted(places, key=lambda i: float(i['distance']))
            return HttpResponse(json.dumps(places))
        return HttpResponse("Bad request", 402)
    return HttpResponse("Wrong HTTP Method", 401)


@csrf_exempt
def get_saved_places(request):
    """
    This request should receive a parameter called cookie, just call it 'c'
    :param request:
    :return: array of places the web cookie holds
    """
    if request.method == 'GET':
        cookie = request.GET.get('c')

        if not cookie:
            return HttpResponse("Non existing cookie", status=401)

        saved = Saved.objects.filter(cookie=cookie).last()

        if not saved:
            return HttpResponse(content=json.dumps([]))

        places = []
        for p in saved.places.all()[:10]:
            place = model_to_dict(p)
            place['photos'] = [photo.get_formatted_url()
                               for photo in p.photo.all()]
            places.append(place)

        return HttpResponse(content=json.dumps(places))

    return HttpResponse("Wrong HTTP Method", 401)


@csrf_exempt
def save_places(request):
    """
    Save all the places that have a place_id to a cookie.

    Example request:
    {
        "identifier": "",
        "places": ["", "", ""]
    }
    """
    if not request.method == 'POST':
        return HttpResponse("Wrong HTTP Method", 401)

    data = json.loads(request.body)
    print(data)
    saved = Saved.get_or_create(data['cookie'])

    for place_id in data['places']:
        place = Place.objects.get(place_id=place_id)
        saved.places.add(place)

    saved.save()

    return HttpResponse("OK")
