import sys, os
import googlemaps
sys.path.insert(1, os.path.join(sys.path[0], '..'))
from controllers.basecontroller import BaseController


class GoogleController(BaseController):
    '''
    Controller for the Google API.
    '''

    def __init__(self):
        super(GoogleController, self).__init__()

        self.gmaps_geocoding = googlemaps.Client(key=self._config['GOOGLE']['geocoding_key'])

    def get_city_info(self, city, state):
        '''
        Given a city, state combination, return a dictionary of latitude,
        longitude, and place id (for use in Google Places API).
        '''
        geocode_result = self.gmaps_geocoding.geocode(city + ", " + state)[0]
        return (geocode_result['geometry']['location'], geocode_result['place_id'])