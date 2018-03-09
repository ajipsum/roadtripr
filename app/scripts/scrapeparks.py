'''
Scrape NPS API for all parks and insert them into parks table in rtdb.

Run from app/ folder.
'''

import sys
import os
sys.path.insert(1, os.path.join(sys.path[0], '..'))
from controllers.npscontroller import NPSController
from controllers.databasecontroller import DatabaseController
from models.park import Park
import sqlalchemy 

parks = NPSController().get_all_parks()

db = DatabaseController()
session = db.get_session()

for park in parks:
    name = park['name']
    website = park['url']
    latlong = park['latLong'].replace('lat:', '').replace('long:', '')
    lat = lng = None
    if latlong:
        lat, lng = map(float, latlong.split(','))

    entry = Park(name=name, latitude=lat, longitude=lng, website=website)
    try:
        session.add(entry)
	session.commit()
    except sqlalchemy.exc.IntegrityError:
	session.rollback()

