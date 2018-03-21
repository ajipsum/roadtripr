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
    name = park['fullName']
    website = park['url']
    latlong = park['latLong'].replace('lat:', '').replace('long:', '')
    lat = lng = None
    if latlong:
        lat, lng = map(float, latlong.split(','))

    try:
        place_id = google.get_park_info(name)
        image_url = images.get_image(place_id)
    except:
        print("No images for ", name)

    entry = Park(name=name, latitude=lat, longitude=lng, website=website, image=image_url)
    try:
        session.add(entry)
        session.commit()
    except sqlalchemy.exc.IntegrityError:
        session.rollback()
