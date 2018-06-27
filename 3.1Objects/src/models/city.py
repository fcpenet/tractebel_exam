import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from src.models.base import Base


class City(Base):
    __tablename__ = 'city'
    name = Column(String(20), primary_key=True, nullable=False)
    pop = Column(Integer, nullable=False)
    state = Column(String(3), ForeignKey('state.id'))
    def __repr__(self):
        return '{}:{}'.format(self.state, self.name)
