from marshmallow import Schema, fields

class MeetingSch(Schema):
  meeting_id = fields.Int()
  username = fields.String()
  sessions = fields.Nested(QuestionsSch)

class SessionSch(Schema):
  session_name = fields.List()
  questions = fields.List()

class QuestionsSch(Schema):
  question1 = fields.List()
  question2 = fields.List()