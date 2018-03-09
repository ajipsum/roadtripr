from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class City(Base):
    __tablename__ = 'city'
    id = Column('id', Integer, primary_key=True, nullable=False)
    name = Column('name', String(50), nullable=False, unique=True)
    latitude = Column('latitude', Float, nullable=False)
    longitude = Column('longitude', Float, nullable=False)
    population = Column('population', Integer)

    def nearby_parks(self):
        pass

    def top_restaurants(self):
        pass
