from src.models.country import Country
from src.models.state import State
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError
from src.models.base import Base
import unittest


class TestStateModel(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:')
        DBSession = sessionmaker(bind=self.engine)
        self.session =DBSession()

        Base.metadata.create_all(self.engine)

        self.country = Country(id='CO', name='country', currency='$')
    def teardown(self):
        self.session.remove()

    def test_state_name_must_be_unique_each_country(self):
        err = None
        try:
            state1 = State(id='S1', name='state1', country=self.country)
            state2 = State(id='S2', name='state1', country=self.country)
        except Exception as e:
            err = e

        self.assertIsInstance(err, IntegrityError)

