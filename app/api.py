from flask import Flask, jsonify, request
from flask_restless import APIManager
from controllers.databasecontroller import DatabaseController
from controllers.githubcontroller import GithubController
from models.city import City
from models.park import Park
from models.restaurant import Restaurant
from utils import miles_distance
# from flask_cors import CORS

app = Flask(__name__)
# app.config['JSON_AS_ASCII'] = False
# CORS(app)
db = DatabaseController()
apimanager = APIManager(app, session=db.get_session())

# Create Endpoints
get_park_limit = apimanager.create_api(Park, url_prefix='/', methods=['GET'])


@app.route('/contribs/', methods=['GET'])
def get_contrib_info():
    gc = GithubController()
    result = {'commits': gc.get_commit_counts(),
              'issues': gc.get_issue_counts()}
    return jsonify(result)

@app.route('/parks/<int:limit>', methods=['GET'])
def get_park_limit(limit):
    db = DatabaseController()
    session = db.get_session()

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    parks_query = session.query(Park).limit(limit).all()
    session.close()
    if parks_query is None:
        return jsonify({'error': 'No parks found.'})
    parks = [park.as_dict() for park in parks_query]
    return jsonify({'total': len(parks), 'data': parks})

@app.route('/parks/', methods=['GET'])
def get_park_params():
    db = DatabaseController()
    session = db.get_session()

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    def get_all_parks():
        parks_query = session.query(Park).all()
        parks = [park.as_dict() for park in parks_query]
        session.close()
        return jsonify({'total': len(parks), 'data': parks})

    def get_parks_by_name(name):
        if name is None:
            session.close()
            return jsonify({'error': 'No parameter \'name\' in request.'})
        parks_query = session.query(Park).filter(Park.name.ilike('%' + name + '%'))
        parks = [park.as_dict() for park in parks_query]
        session.close()
        return jsonify({'total': len(parks), 'data': parks})

    def get_nearby_parks(latitude, longitude, length):
        if latitude is None:
            session.close()
            return jsonify({'error': 'No parameter \'latitude\' in request.'})
        if longitude is None:
            session.close()
            return jsonify({'error': 'No parameter \'longitude\' in request.'})
        if length is None:
            length = 10
        latitude = float(latitude)
        longitude = float(longitude)
        length = int(length)
        if length < 1:
            session.close()
            return jsonify({'error': 'Parameter \'length\' must be greater than 0.'})
        parks_query = session.query(Park).filter(Park.latitude.isnot(None))
        parks = sorted(parks_query, key=lambda park: miles_distance(latitude, longitude, park.latitude, park.longitude))
        parks = parks[:length]
        parks = [park.as_dict() for park in parks]
        session.close()
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

    session.close()
    return jsonify({'error': 'No matching parks call with parameter length ' + str(len(args))})

@app.route('/restaurants/<int:limit>', methods=['GET'])
def get_restaurant_limit(limit):
    db = DatabaseController()
    session = db.get_session()

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    restaurants_query = session.query(Restaurant).limit(limit).all()
    if restaurants_query is None:
        session.close()
        return jsonify({'error': 'No restaurants found.'})
    restaurants = [restaurant.as_dict() for restaurant in restaurants_query]
    session.close()
    return jsonify({'total': len(restaurants), 'data': restaurants})

@app.route('/restaurants/', methods=['GET'])
def get_restaurant_params():
    db = DatabaseController()
    session = db.get_session()

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    def get_all_restaurants():
        restaurants_query = session.query(Restaurant).all()
        restaurants = [restaurant.as_dict() for restaurant in restaurants_query]
        session.close()
        return jsonify({'total': len(restaurants), 'data': restaurants})

    def get_restaurants_by_name(name):
        if name is None:
            session.close()
            return jsonify({'error': 'No parameter \'name\' in request.'})
        restaurants_query = session.query(Restaurant).filter(Restaurant.name.ilike('%'+name+'%'))
        restaurants = [restaurant.as_dict() for restaurant in restaurants_query]
        session.close()
        return jsonify({'total': len(restaurants), 'data': restaurants})

    def get_nearby_restaurants(latitude, longitude, length):
        if latitude is None:
            session.close()
            return jsonify({'error': 'No parameter \'latitude\' in request.'})
        if longitude is None:
            session.close()
            return jsonify({'error': 'No parameter \'longitude\' in request.'})
        if length is None:
            length = 10
        latitude = float(latitude)
        longitude = float(longitude)
        length = int(length)
        if length < 1:
            session.close()
            return jsonify({'error': 'Parameter \'length\' must be greater than 0.'})
        restaurants_query = session.query(Restaurant).filter(Restaurant.latitude.isnot(None))
        restaurants = sorted(restaurants_query, key=lambda restaurant: miles_distance(latitude, longitude, restaurant.latitude, restaurant.longitude))
        restaurants = restaurants[:length]
        restaurants = [restaurant.as_dict() for restaurant in restaurants]
        session.close()
        return jsonify({'total': len(restaurants), 'data': restaurants})

    def get_top_restaurants(city, length):
        city_query = session.query(City).filter(City.name.ilike(city+'%')).first()
        if city_query is None:
            session.close()
            return jsonify({'error': 'No city matching \'' +city+ '\'.'})
        latitude = city_query.latitude
        longitude = city_query.longitude
        if latitude is None:
            session.close()
            return jsonify({'error': 'Could not find coords for specified city.'})
        if longitude is None:
            session.close()
            return jsonify({'error': 'Could not find coords for specified city.'})
        if length is None:
            length = 10
        length = int(length)
        if length < 1:
            session.close()
            return jsonify({'error': 'Parameter \'length\' must be greater than 0.'})

        restaurants_query = session.query(Restaurant).filter(Restaurant.latitude.isnot(None))
        restaurants = sorted(restaurants_query, key=lambda restaurant: miles_distance(latitude, longitude, restaurant.latitude, restaurant.longitude))
        restaurants = list(filter(lambda restaurant: miles_distance(latitude, longitude, restaurant.latitude, restaurant.longitude) < 35, restaurants))
        restaurants = sorted(restaurants, key=lambda restaurant: restaurant.rating, reverse=True)
        restaurants = restaurants[:length]
        restaurants = [restaurant.as_dict() for restaurant in restaurants]
        session.close()
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

    session.close()
    return jsonify({'error': 'No matching restaurants call with parameter length ' + str(len(args))})

@app.route('/cities/<int:limit>', methods=['GET'])
def get_city_limit(limit):
    db = DatabaseController()
    session = db.get_session()

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    cities_query = session.query(City).limit(limit).all()
    if cities_query is None:
        session.close()
        return jsonify({'error': 'No cities found.'})
    cities = [city.as_dict() for city in cities_query]
    session.close()
    return jsonify({'total': len(cities), 'data': cities})

@app.route('/cities/', methods=['GET'])
def get_city_params():
    db = DatabaseController()
    session = db.get_session()

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    def get_all_cities():
        cities_query = session.query(City).all()
        cities = [city.as_dict() for city in cities_query]
        session.close()
        return jsonify({'total': len(cities), 'data': cities})

    def get_cities_by_name(name):
        if name is None:
            session.close()
            return jsonify({'error': 'No parameter \'name\' in request.'})
        cities_query = session.query(City).filter(City.name.ilike('%'+name+'%'))
        cities = [city.as_dict() for city in cities_query]
        session.close()
        return jsonify({'total': len(cities), 'data': cities})

    def get_nearby_cities(latitude, longitude, length):
        if latitude is None:
            session.close()
            return jsonify({'error': 'No parameter \'latitude\' in request.'})
        if longitude is None:
            session.close()
            return jsonify({'error': 'No parameter \'longitude\' in request.'})
        if length is None:
            length = 10
        latitude = float(latitude)
        longitude = float(longitude)
        length = int(length)
        if length < 1:
            session.close()
            return jsonify({'error': 'Parameter \'length\' must be greater than 0.'})
        cities_query = session.query(City).filter(City.latitude.isnot(None))
        cities = sorted(cities_query, key=lambda city: miles_distance(latitude, longitude, city.latitude, city.longitude))
        cities = cities[:length]
        cities = [city.as_dict() for city in cities]
        session.close()
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

    session.close()
    return jsonify({'error': 'No matching cities call with parameter length ' +str(len(args))})

if __name__ == '__main__':
    # app.run(use_reloader=True, threaded=True, host="0.0.0.0", port=80)
    app.run(use_reloader=True, threaded=True)
