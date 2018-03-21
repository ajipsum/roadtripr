from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Park(Base):
    __tablename__ = 'park'
    id = Column('id', Integer, primary_key=True, nullable=False)
    name = Column('name', String(50), nullable=False, unique=True)
    latitude = Column('latitude', Float, nullable=False)
    longitude = Column('longitude', Float, nullable=False)
    website = Column('website', String(200))
    image = Column('image', String(512))

    def as_dict(self):
        result = {}
        result['id'] = self.id
        result['name'] = self.name
        result['latitude'] = self.latitude
        result['longitude'] = self.longitude
        result['website'] = self.website
        result['image'] = self.image
        return result

    def nearby_citys(self):
        pass

    def top_restaurants(self):
        pass
