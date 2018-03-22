'''
Scrape Yelp API for top 50 restaurants near cities and insert them into
restaurants table in rtdb.

Run from app/ folder.
'''

import sys
import os
sys.path.insert(1, os.path.join(sys.path[0], '..'))
from controllers.yelpcontroller import YelpController
from controllers.databasecontroller import DatabaseController
from models.restaurant import Restaurant
from models.city import City

yc = YelpController()

db = DatabaseController()
session = db.get_session()

cities = sorted(session.query(City).all(), key=lambda x: x.population, reverse=True)

for city in cities:
    nearby = yc.get_nearby_restaurants_latlong(city.latitude, city.longitude)
    for rest in nearby:
        name = rest['name']
        lat = rest['coordinates']['latitude']
        lng = rest['coordinates']['longitude']
        website = rest['url']
        rating = rest['rating']
        cuisine = rest['categories'][0]['title']  # fix later to include all
        image = rest['image_url']
        pricing = ''
        try:
            # some places choose not to show prices
            pricing = rest['price']
        except:
            pass

        entry = Restaurant(name=name, latitude=lat, longitude=lng,
                           website=website, rating=rating, cuisine=cuisine,
                           pricing=pricing, image=image)
        try:
            session.add(entry)
            session.commit()
        except:  # we have enough data to ignore bad data
            session.rollback()
