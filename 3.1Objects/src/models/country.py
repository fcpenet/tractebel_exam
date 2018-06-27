import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from src.models.base import Base
class Country(Base):
    __tablename__ = 'country'
    id = Column(String(2), primary_key=True)
    name = Column(String(20), unique=True, nullable=False)
    currency = Column(String(3), nullable=False)
    def __repr__(self):
        return '{}:{}'.format(self.id, self.name)
