from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
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
                    places.append(p)

    return HttpResponse(serializers.serialize('json', places))
