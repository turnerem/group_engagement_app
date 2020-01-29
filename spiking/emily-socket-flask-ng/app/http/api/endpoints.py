from .middlewares import login_required
from flask import Flask, json, g, request
from app.meeting.service import Service
from app.meeting.schema import MeetingSch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# login is required for botht these endpoints
@app.route('/meetings', methods=['GET'])
# @login_required
def index():
  print('in the backend!')
  return json_response(Service(g.user).find_all_meetings())

@app.route('/meetings', methods=['POST'])
# @login_required
def create():
  pres_repo = MeetingSch().load(json.loads(request.data))

  if pres_repo.errors:
    return json_response({'error': pres_repo.errors}, 422)

  meeting = Service(g.user).create_meeting_for(pres_repo)
  return json_response(meeting)

def json_response(payload, status=200):
  return (json.dumps(payload), status, {'content-type': 'application/json'})