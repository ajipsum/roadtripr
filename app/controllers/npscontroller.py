import sys, os
import requests
sys.path.insert(1, os.path.join(sys.path[0], '..'))
from controllers.basecontroller import BaseController


class NPSController(BaseController):
    '''
    Controller for National Parks Services API.
    '''

    def __init__(self):
        super(NPSController, self).__init__()

        self._api_key = 'api_key=' + self._config['NPS']['API_KEY']
        self._base_url = 'https://developer.nps.gov/api/v1/'

    def get_all_parks(self):
        '''
        Return a list of all parks.
        '''
        endpoint = self._base_url + 'parks?' + self._api_key + '&limit=1000'
        r = requests.get(endpoint)

        return r.json()['data']
