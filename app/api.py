from flask import Flask, jsonify, request
from flask_restless import APIManager
from controllers.databasecontroller import DatabaseController
from controllers.githubcontroller import GithubController
from models.city import City
from models.park import Park
from models.restaurant import Restaurant
from utils import miles_distance
from flask_cors import CORS

app = Flask(__name__)
# app.config['JSON_AS_ASCII'] = False
CORS(app)
db = DatabaseController()
apimanager = APIManager(app, session=db.get_session())

# Flask-restless Endpoints
park_endpoints = apimanager.create_api(Park, url_prefix='', methods=['GET'])
restaurant_endpoints = apimanager.create_api(Restaurant, url_prefix='', methods=['GET'])
city_endpoints = apimanager.create_api(City, url_prefix='', methods=['GET'])

# Custom Endpoints
@app.route('/contribs/', methods=['GET'])
def get_contrib_info():
    gc = GithubController()
    result = {'commits': gc.get_commit_counts(),
              'issues': gc.get_issue_counts()}
    return jsonify(result)

@app.route('/park/nearby/', methods=['GET'])
def get_nearby_parks():
    db = DatabaseController()
    session = db.get_session()

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    args = request.args
    latitude = args.get('latitude')
    longitude = args.get('longitude')
    length = args.get('length')

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

@app.route('/restaurant/nearby/', methods=['GET'])
def get_nearby_restaurants():
    db = DatabaseController()
    session = db.get_session()

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    args = request.args
    latitude = args.get('latitude')
    longitude = args.get('longitude')
    length = args.get('length')

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

@app.route('/restaurant/top/', methods=['GET'])
def get_top_restaurants():
    db = DatabaseController()
    session = db.get_session()

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

    args = request.args
    latitude = args.get('latitude')
    longitude = args.get('longitude')
    length = args.get('length')
    city = args.get('city')

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

@app.route('/city/nearby/', methods=['GET'])
def get_nearby_cities():
    db = DatabaseController()
    session = db.get_session()

    args = request.args
    latitude = args.get('latitude')
    longitude = args.get('longitude')
    length = args.get('length')

    if session is None:
        return jsonify({'error': 'Could not retrieve database session.'})

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

@app.route('/visualization')
def visualization():
    return render_template("d3visualization.html")

if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True, host="0.0.0.0", port=80)
    # app.run(use_reloader=True, threaded=True)
