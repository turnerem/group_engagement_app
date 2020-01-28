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

  def find_presentation()
