import os
from flask import Flask, jsonify, request
from controllers.databasecontroller import DatabaseController
from models.city import City
from models.park import Park
from models.restaurant import Restaurant
from utils import miles_distance

app = Flask(__name__)

db = DatabaseController()
session = db.get_session()

@app.route('/api/parks/<int:id>', methods=['GET'])
def get_park_id(id):
    global session
    
    if session == None:
        return jsonify({'error' : 'Could not retrieve database session.'})

    park = session.query(Park).get(id)
    if park == None:
        return jsonify({'error' : 'Park with ID '+str(id)+' does not exist.'})
    return jsonify(park.as_dict())

@app.route('/api/parks/', methods=['GET'])
def get_park_params():
    global session
    
    if session == None:
        return jsonify({'error' : 'Could not retrieve database session.'})

    args = request.args

    if len(args) == 1:
        name = args.get('name')
        if name == None:
            return jsonify({'error' : 'No parameter \'name\' in request.'})
        parks_query = session.query(Park).filter(Park.name.ilike('%'+name+'%'))
        parks = [park.as_dict() for park in parks_query]
        return jsonify({'total' : len(parks),'data':parks})

    if len(args) == 2 or len(args) == 3:
        lat = args.get('lat')
        longitude = args.get('long')
        length = args.get('length')
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

    return jsonify({'error' : 'No matching parks call with parameter length ' +str(len(args))})

@app.route('/api/restaurants/<int:id>', methods=['GET'])
def get_restaurant_id(id):
    global session
    
    if session == None:
        return jsonify({'error' : 'Could not retrieve database session.'})

    restaurant = session.query(Restaurant).get(id)
    if restaurant == None:
        return jsonify({'error' : 'Restaurant with ID '+str(id)+' does not exist.'})
    return jsonify(restaurant.as_dict())

if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True, host="0.0.0.0", port=80)
