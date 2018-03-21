from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class City(Base):
    __tablename__ = 'city'
    id = Column('id', Integer, primary_key=True, nullable=False)
    name = Column('name', String(255), nullable=False, unique=True)
    latitude = Column('latitude', Float, nullable=False)
    longitude = Column('longitude', Float, nullable=False)
    population = Column('population', Integer)
    place_id = Column('place_id', String(255))
    image = Column('image', String(512))

    def as_dict(self):
        result = {}
        result['id'] = self.id
        result['name'] = self.name
        result['latitude'] = self.latitude
        result['longitude'] = self.longitude
        result['population'] = self.population
        result['place_id'] = self.place_id
        result['image'] = self.image
        return result

    def nearby_parks(self):
        pass

    def top_restaurants(self):
        pass
