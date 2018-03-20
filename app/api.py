import os
from flask import Flask, jsonify, request
from controllers.databasecontroller import DatabaseController
from models.city import City
from models.park import Park
from models.restaurant import Restaurant
from utils import miles_distance

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

db = DatabaseController()
session = db.get_session()

@app.route('/parks/<int:id>', methods=['GET'])
def get_park_id(id):
    global session
    
    if session == None:
        return jsonify({'error' : 'Could not retrieve database session.'})

    park = session.query(Park).get(id)
    if park == None:
        return jsonify({'error' : 'Park with ID '+str(id)+' does not exist.'})
    return jsonify(park.as_dict())

@app.route('/parks/', methods=['GET'])
def get_park_params():
    global session
    
    if session == None:
        return jsonify({'error' : 'Could not retrieve database session.'})

    def get_parks_by_name(name):
        if name == None:
            return jsonify({'error' : 'No parameter \'name\' in request.'})
        parks_query = session.query(Park).filter(Park.name.ilike('%'+name+'%'))
        parks = [park.as_dict() for park in parks_query]
        return jsonify({'total' : len(parks),'data':parks})

    def get_nearby_parks(lat,longitude,length):
        if lat == None:
            return jsonify({'error' : 'No parameter \'lat\' in request.'})
        if longitude == None:
            return jsonify({'error' : 'No parameter \'long\' in request.'})
        if length == None:
            length = 10
        lat = float(lat)
        longitude = float(longitude)
        length = int(length)
        if length < 1:
            return jsonify({'error' : 'Parameter \'length\' must be greater than 0.'})
        parks_query = session.query(Park).filter(Park.latitude.isnot(None))
        parks = sorted(parks_query, key=lambda park: miles_distance(lat,longitude,park.latitude,park.longitude))
        parks = parks[:length]
        parks = [park.as_dict() for park in parks]
        return jsonify({'total' : len(parks),'data':parks})

    args = request.args
    name = args.get('name')
    lat = args.get('lat')
    longitude = args.get('long')
    length = args.get('length')

    if len(args) == 1:
        return get_parks_by_name(name)
    if len(args) == 2 or len(args) == 3:
        return get_nearby_parks(lat,longitude,length)
        
    return jsonify({'error' : 'No matching parks call with parameter length ' +str(len(args))})

@app.route('/restaurants/<int:id>', methods=['GET'])
def get_restaurant_id(id):
    global session
    
    if session == None:
        return jsonify({'error' : 'Could not retrieve database session.'})

    restaurant = session.query(Restaurant).get(id)
    if restaurant == None:
        return jsonify({'error' : 'Restaurant with ID '+str(id)+' does not exist.'})
    return jsonify(restaurant.as_dict())

@app.route('/restaurants/', methods=['GET'])
def get_restaurant_params():
    global session
    
    if session == None:
        return jsonify({'error' : 'Could not retrieve database session.'})

    def get_restaurants_by_name(name):
        if name == None:
            return jsonify({'error' : 'No parameter \'name\' in request.'})
        restaurants_query = session.query(Restaurant).filter(Restaurant.name.ilike('%'+name+'%'))
        restaurants = [restaurant.as_dict() for restaurant in restaurants_query]
        return jsonify({'total' : len(restaurants),'data':restaurants})

    def get_nearby_restaurants(lat,longitude,length):
        if lat == None:
            return jsonify({'error' : 'No parameter \'lat\' in request.'})
        if longitude == None:
            return jsonify({'error' : 'No parameter \'long\' in request.'})
        if length == None:
            length = 10
        lat = float(lat)
        longitude = float(longitude)
        length = int(length)
        if length < 1:
            return jsonify({'error' : 'Parameter \'length\' must be greater than 0.'})
        restaurants_query = session.query(Restaurant).filter(Restaurant.latitude.isnot(None))
        restaurants = sorted(restaurants_query, key=lambda restaurant: miles_distance(lat,longitude,restaurant.latitude,restaurant.longitude))
        restaurants = restaurants[:length]
        restaurants = [restaurant.as_dict() for restaurant in restaurants]
        return jsonify({'total' : len(restaurants),'data':restaurants})

    def get_top_restaurants(city,length):
        city_query = session.query(City).filter(City.name.ilike(city+'%')).first()
        if city_query == None:
            return jsonify({'error' : 'No city matching \'' +city+ '\'.'})
        lat = city_query.latitude
        longitude = city_query.longitude
        if lat == None:
            return jsonify({'error' : 'Could not find coords for specified city.'})
        if longitude == None:
            return jsonify({'error' : 'Could not find coords for specified city.'})
        if length == None:
            length = 10
        length = int(length)
        if length < 1:
            return jsonify({'error' : 'Parameter \'length\' must be greater than 0.'})

        restaurants_query = session.query(Restaurant).filter(Restaurant.latitude.isnot(None))
        restaurants = sorted(restaurants_query, key=lambda restaurant: miles_distance(lat,longitude,restaurant.latitude,restaurant.longitude))
        restaurants = list(filter(lambda restaurant: miles_distance(lat,longitude,restaurant.latitude,restaurant.longitude) < 35, restaurants))
        restaurants = sorted(restaurants, key=lambda restaurant: restaurant.rating, reverse=True)
        restaurants = restaurants[:length]
        restaurants = [restaurant.as_dict() for restaurant in restaurants]
        return jsonify({'total' : len(restaurants),'data':restaurants})

    args = request.args
    name = args.get('name')
    lat = args.get('lat')
    longitude = args.get('long')
    length = args.get('length')
    city = args.get('city')

    if len(args) == 1:
        if city == None:
            return get_restaurants_by_name(name)
        else:
            return get_top_restaurants(city,length)
    if len(args) == 2 or len(args) == 3:
        if city == None:
            return get_nearby_restaurants(lat,longitude,length)
        else:
            return get_top_restaurants(city,length)
        
    return jsonify({'error' : 'No matching restaurants call with parameter length ' +str(len(args))})

@app.route('/cities/<int:id>', methods=['GET'])
def get_city_id(id):
    global session
    
    if session == None:
        return jsonify({'error' : 'Could not retrieve database session.'})

    city = session.query(City).get(id)
    if city == None:
        return jsonify({'error' : 'City with ID '+str(id)+' does not exist.'})
    return jsonify(city.as_dict())

@app.route('/cities/', methods=['GET'])
def get_city_params():
    global session
    
    if session == None:
        return jsonify({'error' : 'Could not retrieve database session.'})

    def get_cities_by_name(name):
        if name == None:
            return jsonify({'error' : 'No parameter \'name\' in request.'})
        cities_query = session.query(City).filter(City.name.ilike('%'+name+'%'))
        cities = [city.as_dict() for city in cities_query]
        return jsonify({'total' : len(cities),'data':cities})

    def get_nearby_cities(lat,longitude,length):
        if lat == None:
            return jsonify({'error' : 'No parameter \'lat\' in request.'})
        if longitude == None:
            return jsonify({'error' : 'No parameter \'long\' in request.'})
        if length == None:
            length = 10
        lat = float(lat)
        longitude = float(longitude)
        length = int(length)
        if length < 1:
            return jsonify({'error' : 'Parameter \'length\' must be greater than 0.'})
        cities_query = session.query(City).filter(City.latitude.isnot(None))
        cities = sorted(cities_query, key=lambda city: miles_distance(lat,longitude,city.latitude,city.longitude))
        cities = cities[:length]
        cities = [city.as_dict() for city in cities]
        return jsonify({'total' : len(cities),'data':cities})

    args = request.args
    name = args.get('name')
    lat = args.get('lat')
    longitude = args.get('long')
    length = args.get('length')

    if len(args) == 1:
        return get_cities_by_name(name)
    if len(args) == 2 or len(args) == 3:
        return get_nearby_cities(lat,longitude,length)
        
    return jsonify({'error' : 'No matching cities call with parameter length ' +str(len(args))})

if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True, host="0.0.0.0", port=80)
