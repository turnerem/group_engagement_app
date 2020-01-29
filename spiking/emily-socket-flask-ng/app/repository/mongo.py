import os
from pymongo import MongoClient

# 'collection' is mongo terminology
COLLECTION_NAME = 'meetings'

class MongoRepository(object):
  def __init__(self):
    mongo_url = 'mongodb+srv://douglashellowell:dancingb@cluster0-wvchx.mongodb.net/meetings'
    self.db = MongoClient(mongo_url).meetings

  # This is the bridge between python and mongo db request syntax
  # selector is an object with keys. If we want all meetingss for a given user:
  # it would look something like {'user_id': self.user_id} in app/pres/service.py
  # Or if selecting one pres for that user:
  # than {'user_id':self.user_id, 'meetings_id': meetings_id} (no self on meetings...?)
  def find_all(self, selector):
    return self.db.meetings.find(selector)

  def find(self, selector):
    return self.db.meetings.find_one(selector)

  def create(self, meetings):
    return self.db.meetings.insert_one(meetings)