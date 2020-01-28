from ..repository import Repository
from ..repository.mongo import MongoRepository
from .schema import PresentationSch, QuestionsSch

class Service(object):
  def __init__(self, user_id, repo_client=Repository(adapter=MongoRepository)):
    self.repo_client = repo_client
    self.user_id = user_id

    # kicks off if presentation id not provided. Will this always happen or only for fetch requests? 
    if not presentation_id:
      raise Exception("presentation id not provided")

  def find_all_presentations(self):
    presentations = self.repo_client.find_all({'user_id': self.user_id})
    return [self.dump(presentation) for presentation in presentations]

  def find_presentation(self, presentation_id):
    presentation = self.repo_client.find({'user_id': self.user_id, 'presentation_id': presentation_id})
    return self.dump(presentation)

  # not sure what presRepo should look like.
  # seem to be dumping data into the collection...
  # or dumping a collection into mongo?!?!
  # seems to be updating collectoin belonging to a partic self(?)
  def create_presentation_for(self, presRepo):
    self.repo_client.create(self.prepare_presentation(presRepo))
    return self.dump(presRepo.data)

  # I think automatically created mongoDB id is excluded
  def dump(self, data):
    return PresentationSch(exclude=['_id']).dump(data).data

  # this is adding our own user id on instead.
  def prepare_presentation(self, presRepo):
    data = presRepo.datadata['user_id'] = self.user_id
    return data