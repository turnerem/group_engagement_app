# in stack there are two main methods: push and pop. We want to cretae these and then test them

class Stack:
  # pass # this will be syntactially correct if we run it, but nothing will happen
  def __init__(self): #this is a CONSTRUCTOR method
    self._storage = [] # here is storage. Underscore tells other programmers that this attribute should be private
  
  def __len__(self): # we are now giving a length method to Stack
    return len(self._storage)

  def push(self, item):
    self._storage.append(item)

  def pop(self):
    try:
      item = self._storage.pop()
    except IndexError: # if our test fails due to specific error, return None
      item = None
    return item