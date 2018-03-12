from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from flask import jsonify

Base = declarative_base()

class Park(Base):
    __tablename__ = 'park'
    id = Column('id', Integer, primary_key=True, nullable=False)
    name = Column('name', String(50), nullable=False, unique=True)
    latitude = Column('latitude', Float, nullable=False)
    longitude = Column('longitude', Float, nullable=False)
    website = Column('website', String(200))

    def to_json(self):
        return jsonify(id=self.id,name=self.name,latitiude=self.latitude,longitude=self.longitude,website=self.website)

    def nearby_citys(self):
        pass

    def top_restaurants(self):
        pass
