from src.models.country import Country
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError
from src.models.base import Base
import unittest

class TestCountryModel(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:')
        DBSession = sessionmaker(bind=self.engine)
        self.session =DBSession()

        Base.metadata.create_all(self.engine)

    def teardown(self):
        self.session.remove()

    def test_create_country_must_not_accept_1_char_acronym(self):
        try:
            country1 = Country(id='C', name='country1', currency='$')
            self.session.add(country1)
            self.session.commit()
        except Exception as e:
            print(e)
            self.assertEqual('id must be 2 chars', e)

        self.assertTrue(False)


    def test_country_name_must_be_unique(self):
        err = None
        try:
            country1 = Country(id='C1', name='country1', currency='$')
            country2 = Country(id='C2', name='country1', currency='$')
            self.session.add(country1)
            self.session.add(country2)
            self.session.commit()
        except Exception as e:
            err = e


        self.assertIsInstance(err, IntegrityError)

