import json
import unittest
import sys
import mock
from main import app
#from scrapeparks import *
#from scrapecity import *
#from scraperestaurants import *

class Test(unittest.TestCase):
 
    def setUp(self):
        app.config[‘TESTING’] = True
        self.app = app.test_client()

    def test_website(self):
        r = requests.get('http://www.roadtripr.fun')
        self.assertEqual(r.status_code, 200)

    def test_api(self):
    	r = requests.get('http://www.roadtripr.fun')
        self.assertEqual(r.status_code, 200)

    def test_parks(self):
    	r = requests.get('http://www.roadtripr.fun/parks')
        self.assertEqual(r.status_code, 200)

    def test_cities(self):
    	r = requests.get('http://www.roadtripr.fun/cities')
        self.assertEqual(r.status_code, 200)

    def test_restaurants(self):
    	r = requests.get('http://www.roadtripr.fun/restaurants')
        self.assertEqual(r.status_code, 200)


if __name__ == '__main__':
    unittest.main()