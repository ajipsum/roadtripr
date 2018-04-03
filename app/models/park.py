from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Park(Base):
    __tablename__ = 'park'
    id = Column('id', Integer, primary_key=True, nullable=False)
    name = Column('name', String(50), nullable=False, unique=True)
    latitude = Column('latitude', Float, nullable=False)
    longitude = Column('longitude', Float, nullable=False)
    website = Column('website', String(200))
    image = Column('image', String(512))
    designation = Column('designation', String(200))
    states = Column('states', String(150))
    cost = Column('cost', Float)

    def as_dict(self):
        result = {}
        result['id'] = self.id
        result['name'] = self.name
        result['latitude'] = self.latitude
        result['longitude'] = self.longitude
        result['website'] = self.website
        result['image'] = self.image
        result['designation'] = self.designation
        result['states'] = self.states
        result['cost'] = self.cost
        return result

    def nearby_citys(self):
        pass

    def top_restaurants(self):
        pass
