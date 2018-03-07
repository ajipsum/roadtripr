import requests
from basecontroller import BaseController

class YelpController(BaseController):
    '''
    Controller for Yelp API.
    '''

    def __init__(self):
        super(YelpController, self).__init__()
        
        self._endpoint = 'https://api.yelp.com/v3/businesses/search'

        bearer = self._config['YELP']['authorization']
        self._headers = {'Authorization': bearer}

    def get_nearby_restaurants_latlong(self, latitude: float, longitude: float) -> dict:
        '''
        Given the latitude and longitude, return a list of up to 50 nearby
        restaurants.
        '''
        params = {"latitude": latitude, "longitude": longitude, "limit": 50}
        r = requests.get(self._endpoint, params=params, headers=self._headers)
        
        return r.json()['businesses']

    def get_nearby_restaurants_city(self, city: str, state: str) -> dict:
        '''
        Given the name of a city and a two letter state code, return a list
        of up to 50 nearby restaurants.
        '''
        params = {"location": city + " " + state, "limit": 50}
        r = requests.get(self._endpoint, params=params, headers=self._headers)
       
        return r.json()['businesses']
