import json, unittest, sys, os
sys.path.insert(1, os.path.join(sys.path[0], '../app'))
from controllers.databasecontroller import DatabaseController
from utils import miles_distance
import time
class Test(unittest.TestCase):

    # Test SQLAlchemy db connection
    def test_db_controller(self):
        db = DatabaseController()
        self.assertIsNotNone(db)
        session = db.get_session()
        self.assertIsNotNone(session)

    # Make sure that rows can be encoded/decoded correctly
    def test_db_restaurant_valid_data(self):
        db = DatabaseController()
        session = db.get_session()
        query = session.execute("select id, name from restaurant WHERE name <> CONVERT(name USING ASCII);")
        result = query.fetchall()
        self.assertTrue(len(result) == 0)

    # Make sure that rows can be encoded/decoded correctly
    def test_db_city_valid_data(self):
        db = DatabaseController()
        session = db.get_session()
        query = session.execute("select id, name from city WHERE name <> CONVERT(name USING ASCII);")
        result = query.fetchall()
        self.assertTrue(len(result) == 0)

    # Make sure that rows can be encoded/decoded correctly
    def test_db_park_valid_data(self):
        db = DatabaseController()
        session = db.get_session()
        query = session.execute("select id, name from park WHERE name <> CONVERT(name USING ASCII);")
        result = query.fetchall()
        self.assertTrue(len(result) == 0)
        
    # Test miles_distance correctness
    def test_miles_distance(self):
        austin_houston = miles_distance(30.2672,-97.7431,29.7604,-95.3698)
        self.assertTrue(145 < austin_houston < 147)
        ny_la = miles_distance(40.7128,-74.006,34.0522,-118.244)
        self.assertTrue(2440 < ny_la < 2450)

if __name__ == '__main__':
    unittest.main()