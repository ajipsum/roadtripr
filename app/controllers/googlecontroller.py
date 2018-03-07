import requests
import googlemaps
from basecontroller import BaseController


class GoogleController(BaseController):
    '''
    Controller for the Google API.
    '''
    
    def __init__(self):
        super(GoogleController, self).__init__()
        
        self.gmaps_geocoding = googlemaps.Client(key=self._config['GOOGLE']['geocoding_key'])

    def get_city_latlong(self, city: str, state: str) -> dict:
        '''
        Given a city, state combination, return a dictionary of latitude,
        longitude.
        '''
        geocode_result = self.gmaps_geocoding.geocode(city + ", " + state)[0]
        return geocode_result['geometry']['location']
