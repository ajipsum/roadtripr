import requests
import configparser

class NPSController:
    _base_url = 'https://developer.nps.gov/api/v1/'

    def __init__(self):
        config = configparser.ConfigParser()
        config.read('config.ini')
        self._api_key = 'api_key=' + config['NPS']['API_KEY']

    def get_all_parks(self):
        endpoint = self._base_url + 'parks?' + self._api_key
        r = requests.get(endpoint)
        return r.json()