import os
import ge_app
import unittest
# import pytest
import json
import pprint

# @pytest.fixture
# def get_user():
#   def setUp
#   res = self
#   return 

# def test_type():


class MyTestCase( unittest.TestCase ):
  
  def setUp(self):
    ge_app.app.testing = True
    self.app = ge_app.app.test_client()

  def test_home(self):
    result = self.app.get('/api/Dave')
    data = json.loads(result.data)
    print('\n\nthe result', pprint.pprint(data), '\n')
    self.assertIsInstance(data, dict)
    print('\nThe sessions array', )
    self.assertTrue(len(data['sessions']) > 0)
    

# spaces in session name? spaces elseqhere?