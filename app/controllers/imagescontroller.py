import sys, os
import googlemaps
sys.path.insert(1, os.path.join(sys.path[0], '..'))
from controllers.basecontroller import BaseController

class ImageController(BaseController):
    '''
    Controller to get images for a place id using Google Places API.
    '''

    def __init__(self):
        super(ImageController, self).__init__()
        self.gmaps_places = googlemaps.Client(key=self._config['GOOGLE']['places_key'])
        self.base_url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference='
        self.url_end = '&key=' + self._config['GOOGLE']['places_key']

    def get_image(self, place_id):
        '''
        Given a place_id from Google, return the URL of its image.
        '''

        place_search = self.gmaps_places.place(place_id)
        photo_ref = place_search['result']['photos'][0]['photo_reference']
        photo_url = self.base_url + photo_ref + self.url_end
        return photo_url

if __name__ == "__main__":
    ic = ImageController()
    print(ic.get_image('ChIJOwg_06VPwokRYv534QaPC8g'))
