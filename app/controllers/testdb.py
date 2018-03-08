import sys, os
sys.path.insert(1, os.path.join(sys.path[0], '..'))
from databasecontroller import DatabaseController
from models.city import City
from models.park import Park
from models.restaurant import Restaurant

db = DatabaseController()
session = db.get_session()
austin = City(name='NEW',latitude=32535214.124124,longitude=3243523.1221444,website='roatripr.fun',population=21412434)
session.add(austin)
session.commit()