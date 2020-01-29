class Repository(object):
  # adapter=None creates the ABSTRACT class?
  def __init__(self, adapter=None):
    if not adapter:
      raise ValueError("Invalid repository implementation")
    self.client = adapter()

  def find_all(self, selector):
    return self.client.find_all(selector)
    
  def find(self, selector):
    return self.client.find(selector)

  def create(self, meeting):
    return self.client.create(meeting)