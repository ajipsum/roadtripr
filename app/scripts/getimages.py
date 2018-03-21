'''
Scrape Google Places API for photos of cities.

Run from app/ folder.
'''

import sys
import os
sys.path.insert(1, os.path.join(sys.path[0], '..'))
from controllers.imagescontroller import ImageController
from controllers.databasecontroller import DatabaseController
from models.city import City

ic = ImageController()

db = DatabaseController()
session = db.get_session()

cities = session.query(City).all()

for city in cities:
    if city.image is not None:
        continue
    pid = city.place_id
    try:
        photo_url = ic.get_image(pid)
    except:
        continue
    city.image = photo_url
    session.add(city)
    session.commit()
