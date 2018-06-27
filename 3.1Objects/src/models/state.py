import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from src.models.base import Base


class State(Base):
    __tablename__ = 'state'
    id = Column(String(3), primary_key=True)
    name = Column(String(20), unique=True, nullable=False)
    country = Column(String(2), ForeignKey('country.id'))
    def __repr__(self):
        return '{}:{}:{}'.format(self.country,self.id, self.name)
