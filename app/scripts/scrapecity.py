'''
Scrape Google API for latitude and longitude of cities. Read list of cities
from scripts/cities.txt and writes to city table in rtdb.

Run from app/ folder.
'''

import ast
import sys
import os
sys.path.insert(1, os.path.join(sys.path[0], '..'))
from controllers.googlecontroller import GoogleController
from controllers.databasecontroller import DatabaseController
from models.city import City


cities = [ast.literal_eval(line) for line in open('scripts/cities.txt', mode='r')]

gc = GoogleController()

db = DatabaseController()
session = db.get_session()

for c in cities:
    city = c[0]
    state = c[1].strip()
    pop = int(c[2])
    info = gc.get_city_info(city, state)
    lat = info[0]['lat']
    lng = info[0]['lng']
    pid = info[1]

    entry = City(name="{}, {}".format(city, state), latitude=lat, longitude=lng, population=pop, place_id=pid)
    session.add(entry)
    session.commit()
