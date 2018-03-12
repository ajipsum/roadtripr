import os
from flask import Flask, jsonify, request
from controllers.databasecontroller import DatabaseController
from models.city import City
from models.park import Park
from models.restaurant import Restaurant

app = Flask(__name__)

db = DatabaseController()
session = db.get_session()

@app.route('/api/parks/<int:id>', methods=['GET'])
def get_park_id(id):
    global session
    
    if session == None:
        return jsonify({'error' : 'Could not retrive database session.'})

    park = session.query(Park).get(id)
    if park == None:
        return jsonify({'error' : 'Park with ID '+str(id)+' does not exist.'})
    return jsonify(park.as_dict())

@app.route('/api/parks/', methods=['GET'])
def get_park_params():
    global session
    
    if session == None:
        return jsonify({'error' : 'Could not retrive database session.'})

    args = request.args

    if len(args) == 1:
        name = args.get('name')
        if name == None:
            return jsonify({'error' : 'No parameter \'name\' in request.'})
        parks_query = session.query(Park).filter(Park.name.ilike('%'+name+'%'))
        total = parks_query.count()
        parks = [park.as_dict() for park in parks_query]
        return jsonify({'total' : total,'data':parks})
        
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
        length = int(length)
        if length < 1:
            return jsonify({'error' : 'Parameter \'length\' must be greater than 0.'})
        # todo query
        return jsonify({'todo' : 'todo'})

    return jsonify({'error' : 'No matching parks call with parameter length ' +str(len(args))})

if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True)
