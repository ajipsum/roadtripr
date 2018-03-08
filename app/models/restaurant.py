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
    website = Column('website', String(200))
    rating = Column('rating', Float)
    cuisine = Column('cuisine', String(50))
    pricing = Column('pricing', String(10))

    def nearby_parks(self):
        pass

    def nearby_citys(self):
        pass
