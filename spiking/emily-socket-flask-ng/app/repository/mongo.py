import os
from pymongo import MongoClient

# 'collection' is mongo terminology
COLLECTION_NAME = 'presentation'

class MongoRepository(object):
  def __init__(self):
    mongo_url = os.environ.get('MONGO_URL')
    self.db = MongoClient(mongo_url).presentation

  # This is the bridge between python and mongo db request syntax
  def find(self, selector):
    return self.db.presentation.find_one(selector)

  def create(self, selector):
    return self.db.presentation.insert_one(a_presentation)