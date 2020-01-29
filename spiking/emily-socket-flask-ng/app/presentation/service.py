# only using Meeting Schema for now. How to work with nested schema?

from ..repository import Repository
from ..repository.mongo import MongoRepository
from .schema import MeetingSch, QuestionsSch

class Service(object):
  def __init__(self, user_id, repo_client=Repository(adapter=MongoRepository)):
    self.repo_client = repo_client
    self.user_id = user_id

    # kicks off if meeting id not provided. Will this always happen or only for fetch requests? 
    if not user_id:
      raise Exception("meeting id not provided")

  def find_all_meetings(self):
    meetings = self.repo_client.find_all({'user_id': self.user_id})
    return [self.dump(meeting) for meeting in meetings]

  def find_meeting(self, meeting_id):
    meeting = self.repo_client.find({'user_id': self.user_id, 'meeting_id': meeting_id})
    return self.dump(meeting)

  # not sure what presRepo should look like.
  # seem to be dumping data into the collection...
  # or dumping a collection into mongo?!?!
  # seems to be updating collectoin belonging to a partic self(?)
  def create_meeting_for(self, presRepo):
    self.repo_client.create(self.prepare_meeting(presRepo))
    return self.dump(presRepo.data)

  # I think automatically created mongoDB id is excluded
  def dump(self, data):
    return MeetingSch(exclude=['_id']).dump(data).data

  # this is adding our own user id on instead.
  def prepare_meeting(self, presRepo):
    data = presRepo.datadata['user_id'] = self.user_id
    return data