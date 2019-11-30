def populate():
    import json
    from onboarding.models import Place

    with open("apartments.json") as fp:
        apartments = json.load(fp)

    apartments = apartments['listings']

    for a in apartments:
        Place.objects.create(
            place_id=a['id'],
            status=a['status'],
            unit_id=a['unitId'],
            bedrooms=a['bedrooms'],
            suits=a['suits'],
            parking_spots=a['parkingSpots'],
            floor=a['floor'],
            complex_fee=a['complexFee'],
            property_tax=a['propertyTax'],
            price=a['price'],
            description=a['description'],
            current_phase=a['currentPhase'],
            has_power_generator='condoPowerGenerator' in a['amenities'],
            has_gourmet='gourmet' in a['amenities'],
            has_green_area='green_area' in a['amenities'],
            has_grill='grill' in a['amenities'],
            has_gym='gym' in a['amenities'],
            has_heated_pool='heated_pool' in a['amenities'],
            has_kids='kids' in a['amenities'],
            has_party_room='party_room' in a['amenities'],
            has_play_game='play_game' in a['amenities'],
            has_playground='playground' in a['amenities'],
            has_pool='pool' in a['amenities'],
            has_court='sports_court' in a['amenities'],
            street_name=a['address']['streetName'],
            street_type=a['address']['streetType'],
            number=a['address']['number'],
            neighborhood=a['address']['neighborhood'],
            city=a['address']['city'],
            state=a['address']['state'],
            lat=a['address']['lat'],
            lng=a['address']['lng']
        )