from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
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
