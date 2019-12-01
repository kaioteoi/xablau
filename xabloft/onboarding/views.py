from django.core import serializers
from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from onboarding.models import Saved, Place
import json
import requests
import urllib
import geopy.distance
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
        locationiq_request['q'] = data['location']
        max_dist = int(data['distance'])
        resp = requests.get(LOCATIONIQ_URL + urllib.parse.urlencode(locationiq_request)).json()

        if len(resp) > 0:
            coords_1 = (resp[0]['lat'], resp[0]['lon'])

            places = []
            for p in Place.objects.filter(status__in=['FOR_SALE', 'JUST_LISTED']):
                coords_2 = (p.lat, p.lng)
                dist = geopy.distance.geodesic(coords_1, coords_2).km * 10
                if dist <= max_dist:
                    place = model_to_dict(p)
                    place['distance'] = dist
                    places.append(place)

    return HttpResponse(json.dumps(places))


@csrf_exempt
def get_saved_places(request):
    """
    This request should receive a parameter called cookie, just call it 'c'
    :param request:
    :return: array of places the web cookie holds
    """
    if request.method == 'GET':
        cookie = request.GET.get('c')

        saved = Saved.objects.filter(cookie=cookie).last()
        if not saved:
            return HttpResponse("Non existing cookie", status=401)

        json_saved = serializers.serialize("json", )

        places = [model_to_dict(p) for p in saved.places.all()]

        return HttpResponse(content=json.dumps(places), status=200)

    return HttpResponse("Wrong HTTP Method", 401)


@csrf_exempt
def save_places(request):
    """
    Save all the places that have a place_id to a cookie.

    Example request:
    {
        "cookie": "",
        "places": ["", "", ""]
    }
    """
    if not request.method == 'POST':
        return HttpResponse("Wrong HTTP Method", 401)

    data = json.loads(request.body)
    saved = Saved.get_or_create(data['cookie'])

    for place_id in data['places']:
        saved.places.add(Place.objects.filter(place_id=place_id).last())
    saved.save()
    return HttpResponse("OK")
