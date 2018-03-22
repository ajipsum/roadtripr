from flask import Flask, jsonify, request
from controllers.databasecontroller import DatabaseController
from models.city import City
from models.park import Park
from models.restaurant import Restaurant
from utils import miles_distance
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

db = DatabaseController()
session = db.get_session()

@app.route('/parks/<int:id>', methods=['GET'])
def get_park_id(id):
    global session

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    park = session.query(Park).get(id)
    if park is None:
        return jsonify({'error': 'Park with ID '+ str(id) +' does not exist.'})
    return jsonify(park.as_dict())

@app.route('/parks/', methods=['GET'])
def get_park_params():
    global session

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    def get_all_parks():
        parks_query = session.query(Park).all()
        parks = [park.as_dict() for park in parks_query]
        return jsonify({'total': len(parks), 'data': parks})

    def get_parks_by_name(name):
        if name is None:
            return jsonify({'error': 'No parameter \'name\' in request.'})
        parks_query = session.query(Park).filter(Park.name.ilike('%' + name + '%'))
        parks = [park.as_dict() for park in parks_query]
        return jsonify({'total': len(parks), 'data': parks})

    def get_nearby_parks(latitude, longitude, length):
        if latitude is None:
            return jsonify({'error': 'No parameter \'latitude\' in request.'})
        if longitude is None:
            return jsonify({'error': 'No parameter \'longitude\' in request.'})
        if length is None:
            length = 10
        latitude = float(latitude)
        longitude = float(longitude)
        length = int(length)
        if length < 1:
            return jsonify({'error': 'Parameter \'length\' must be greater than 0.'})
        parks_query = session.query(Park).filter(Park.latitude.isnot(None))
        parks = sorted(parks_query, key=lambda park: miles_distance(latitude, longitude, park.latitude, park.longitude))
        parks = parks[:length]
        parks = [park.as_dict() for park in parks]
        return jsonify({'total': len(parks), 'data': parks})

    args = request.args
    name = args.get('name')
    latitude = args.get('latitude')
    longitude = args.get('longitude')
    length = args.get('length')

    if len(args) == 0:
        return get_all_parks()
    if len(args) == 1:
        return get_parks_by_name(name)
    if len(args) == 2 or len(args) == 3:
        return get_nearby_parks(latitude, longitude, length)

    return jsonify({'error': 'No matching parks call with parameter length ' + str(len(args))})

@app.route('/restaurants/<int:id>', methods=['GET'])
def get_restaurant_id(id):
    global session

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    restaurant = session.query(Restaurant).get(id)
    if restaurant is None:
        return jsonify({'error': 'Restaurant with ID '+str(id)+' does not exist.'})
    return jsonify(restaurant.as_dict())

@app.route('/restaurants/', methods=['GET'])
def get_restaurant_params():
    global session

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    def get_all_restaurants():
        restaurants_query = session.query(Restaurant).all()
        restaurants = [restaurant.as_dict() for restaurant in restaurants_query]
        return jsonify({'total': len(restaurants), 'data': restaurants})

    def get_restaurants_by_name(name):
        if name is None:
            return jsonify({'error': 'No parameter \'name\' in request.'})
        restaurants_query = session.query(Restaurant).filter(Restaurant.name.ilike('%'+name+'%'))
        restaurants = [restaurant.as_dict() for restaurant in restaurants_query]
        return jsonify({'total': len(restaurants), 'data': restaurants})

    def get_nearby_restaurants(latitude, longitude, length):
        if latitude is None:
            return jsonify({'error': 'No parameter \'latitude\' in request.'})
        if longitude is None:
            return jsonify({'error': 'No parameter \'longitude\' in request.'})
        if length is None:
            length = 10
        latitude = float(latitude)
        longitude = float(longitude)
        length = int(length)
        if length < 1:
            return jsonify({'error': 'Parameter \'length\' must be greater than 0.'})
        restaurants_query = session.query(Restaurant).filter(Restaurant.latitude.isnot(None))
        restaurants = sorted(restaurants_query, key=lambda restaurant: miles_distance(latitude, longitude, restaurant.latitude, restaurant.longitude))
        restaurants = restaurants[:length]
        restaurants = [restaurant.as_dict() for restaurant in restaurants]
        return jsonify({'total': len(restaurants), 'data': restaurants})

    def get_top_restaurants(city, length):
        city_query = session.query(City).filter(City.name.ilike(city+'%')).first()
        if city_query is None:
            return jsonify({'error': 'No city matching \'' +city+ '\'.'})
        latitude = city_query.latitude
        longitude = city_query.longitude
        if latitude is None:
            return jsonify({'error': 'Could not find coords for specified city.'})
        if longitude is None:
            return jsonify({'error': 'Could not find coords for specified city.'})
        if length is None:
            length = 10
        length = int(length)
        if length < 1:
            return jsonify({'error': 'Parameter \'length\' must be greater than 0.'})

        restaurants_query = session.query(Restaurant).filter(Restaurant.latitude.isnot(None))
        restaurants = sorted(restaurants_query, key=lambda restaurant: miles_distance(latitude, longitude, restaurant.latitude, restaurant.longitude))
        restaurants = list(filter(lambda restaurant: miles_distance(latitude, longitude, restaurant.latitude, restaurant.longitude) < 35, restaurants))
        restaurants = sorted(restaurants, key=lambda restaurant: restaurant.rating, reverse=True)
        restaurants = restaurants[:length]
        restaurants = [restaurant.as_dict() for restaurant in restaurants]
        return jsonify({'total': len(restaurants), 'data': restaurants})

    args = request.args
    name = args.get('name')
    latitude = args.get('latitude')
    longitude = args.get('longitude')
    length = args.get('length')
    city = args.get('city')

    if len(args) == 0:
        return get_all_restaurants()

    if len(args) == 1:
        if city is None:
            return get_restaurants_by_name(name)

        return get_top_restaurants(city, length)

    if len(args) == 2 or len(args) == 3:
        if city is None:
            return get_nearby_restaurants(latitude, longitude, length)

        return get_top_restaurants(city, length)

    return jsonify({'error': 'No matching restaurants call with parameter length ' + str(len(args))})

@app.route('/cities/<int:limit>', methods=['GET'])
def get_city_limit(limit):
    global session

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    cities_query = session.query(City).limit(limit).all()
    if cities_query is None:
        return jsonify({'error': 'No cities found.'})
    cities = [city.as_dict() for city in cities_query]
    return jsonify({'total': len(cities), 'data': cities})

@app.route('/cities/', methods=['GET'])
def get_city_params():
    global session

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    def get_all_cities():
        cities_query = session.query(City).all()
        cities = [city.as_dict() for city in cities_query]
        return jsonify({'total': len(cities), 'data': cities})

    def get_cities_by_name(name):
        if name is None:
            return jsonify({'error': 'No parameter \'name\' in request.'})
        cities_query = session.query(City).filter(City.name.ilike('%'+name+'%'))
        cities = [city.as_dict() for city in cities_query]
        return jsonify({'total': len(cities), 'data': cities})

    def get_nearby_cities(latitude, longitude, length):
        if latitude is None:
            return jsonify({'error': 'No parameter \'latitude\' in request.'})
        if longitude is None:
            return jsonify({'error': 'No parameter \'longitude\' in request.'})
        if length is None:
            length = 10
        latitude = float(latitude)
        longitude = float(longitude)
        length = int(length)
        if length < 1:
            return jsonify({'error': 'Parameter \'length\' must be greater than 0.'})
        cities_query = session.query(City).filter(City.latitude.isnot(None))
        cities = sorted(cities_query, key=lambda city: miles_distance(latitude, longitude, city.latitude, city.longitude))
        cities = cities[:length]
        cities = [city.as_dict() for city in cities]
        return jsonify({'total': len(cities), 'data': cities})

    args = request.args
    name = args.get('name')
    latitude = args.get('latitude')
    longitude = args.get('longitude')
    length = args.get('length')

    if len(args) == 0:
        return get_all_cities()
    if len(args) == 1:
        return get_cities_by_name(name)
    if len(args) == 2 or len(args) == 3:
        return get_nearby_cities(latitude, longitude, length)

    return jsonify({'error': 'No matching cities call with parameter length ' +str(len(args))})

if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True, host="0.0.0.0", port=80)
