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

    def teardown(self):
        self.session.remove()

    def test_init(self):
        self.assertFalse(True)
