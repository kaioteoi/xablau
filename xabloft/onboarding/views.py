from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from onboarding.models import Saved, Place
import json
import requests
import urllib

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
        resp = requests.get(LOCATIONIQ_URL + urllib.parse.urlencode(locationiq_request)).json()

        if len(resp) > 0:
            lat_origin = resp[0]['lat']
            lng_origin = resp[0]['lon']

    return HttpResponse("OK")


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
        json_saved = serializers.serialize("json", saved.places.all(), fields=('place_id', 'price'))
        return HttpResponse(content=json_saved, status=200)
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
