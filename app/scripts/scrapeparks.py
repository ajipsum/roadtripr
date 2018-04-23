'''
Scrape NPS API for all parks and insert them into parks table in rtdb.

Run from app/ folder.
'''

import sys
import os
sys.path.insert(1, os.path.join(sys.path[0], '..'))
from controllers.npscontroller import NPSController
from controllers.databasecontroller import DatabaseController
from controllers.googlecontroller import GoogleController
from controllers.imagescontroller import ImageController
from models.park import Park
import sqlalchemy

parks = NPSController().get_all_parks()

google = GoogleController()
images = ImageController()
db = DatabaseController()
session = db.get_session()

for park in parks:
    name = park['name']
    print(name)
    website = park['url']
    latlong = park['latLong'].replace('lat:', '').replace('long:', '')
    lat = lng = None
    des = None
    states = None
    cost = None
    if latlong:
        lat, lng = map(float, latlong.split(','))
    
    try:
        des = park['designation']
    except:
	pass

    try:
	states = park['states']
    except:
	pass

    try:
        cost = park['cost']
    except:
        pass

    try:
        place_id = google.get_park_info(name)
        image_url = images.get_image(place_id)
    except:
	pass


    entry = Park(name=name, latitude=lat, longitude=lng, website=website, image=image_url,
		 designation=des, states=states, cost=cost)
    try:
        session.add(entry)
	session.commit()
    except sqlalchemy.exc.IntegrityError:
        session.rollback()

