import os
from pymongo import MongoClient

# 'collection' is mongo terminology
COLLECTION_NAME = 'presentation'

class MongoRepository(object):
  def __init__(self):
    mongo_url = os.environ.get('MONGO_URL')
    self.db = MongoClient(mongo_url).presentation

  # This is the bridge between python and mongo db request syntax
  # selector is an object with keys. If we want all presentations for a given user:
  # it would look something like {'user_id': self.user_id} in app/pres/service.py
  # Or if selecting one pres for that user:
  # than {'user_id':self.user_id, 'presentation_id': presentation_id} (no self on presentation...?)
  def find_all(self, selector):
    return self.db.presentation.find(selector)

  def find(self, selector):
    return self.db.presentation.find_one(selector)

  def create(self, selector):
    return self.db.presentation.insert_one(a_presentation)