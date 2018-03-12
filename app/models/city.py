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

    def to_json(self):
        return jsonify(id=self.id,name=self.name,latitiude=self.latitude,longitude=self.longitude,population=self.population)

    def nearby_parks(self):
        pass

    def top_restaurants(self):
        pass
