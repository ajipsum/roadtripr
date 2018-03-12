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
        return jsonify(id=self.id,name=self.name,latitiude=self.latitude,longitude=self.longitude,website=self.website,rating=self.rating,cuisine=self.cuisine,pricing=self.pricing)

    def nearby_parks(self):
        pass

    def nearby_citys(self):
        pass
