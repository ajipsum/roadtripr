import os
from flask import Flask, jsonify
from controllers.databasecontroller import DatabaseController
from models.city import City
from models.park import Park
from models.restaurant import Restaurant

app = Flask(__name__)

db = DatabaseController()
session = db.get_session()

@app.route('/parks/<int:id>', subdomain='api', methods=['GET'])
def get_park(id):
    global session
    
    if session == None:
        return jsonify({'error' : 'Could not retrive database session.'})
    
    park = Park.query.get(id)
    if park == None:
        return jsonify({'error' : 'Park with ID '+id+' does not exist.'})
    return jsonify(park)

if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True)
