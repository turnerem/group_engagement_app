# when testing with pytest (and unittest?), any file that you want to test must be prefixed with the word 'test_'
from ds.stack import Stack
import pytest

@pytest.fixture
def stack():
  return Stack()

def test_constructor(): # also 'test_' naming convention here for pytest
  s = Stack() #now that we've got this obect we can make assertions against it
  assert isinstance(s, Stack) # is s instance of Stack? (yes)
  assert len(s) == 0

# now... can repeat s=Stack() over again, or we can use a 'fixture'
# import pytest and then use @pytest.fixture thing above and pass lower-case stack as argument to test functions

def test_push(stack):
  stack.push(3)
  assert len(stack) == 1
  stack.push(5)
  assert len(stack) == 2

def test_pop(stack):
  stack.push('hiya')
  stack.push('yellow')
  assert stack.pop() == 'yellow'
  assert stack.pop() == 'hiya'
  assert stack.pop() is None

# finally, run python -m pytest -v --cov to check the files that the test covered