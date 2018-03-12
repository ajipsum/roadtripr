from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Restaurant(Base):
    __tablename__ = 'restaurant'
    id = Column('id', Integer, primary_key=True, nullable=False)
    name = Column('name', String(50), nullable=False, unique=True)
    latitude = Column('latitude', Float, nullable=False)
    longitude = Column('longitude', Float, nullable=False)
    website = Column('website', String(255))
    rating = Column('rating', Float)
    cuisine = Column('cuisine', String(50))
    pricing = Column('pricing', String(10))

    def to_json(self):
        result = {}
        result['id'] = self.id
        result['name'] = self.name
        result['latitude'] = self.latitude
        result['longitude'] = self.longitude
        result['website'] = self.website
        result['rating'] = self.rating
        result['cuisine'] = self.cuisine
        result['pricing'] = self.pricing
        return result

    def nearby_parks(self):
        pass

    def nearby_citys(self):
        pass
