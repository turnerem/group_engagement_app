from marshmallow import Schema, fields

class PresentationSch(Schema):
  presentation_id = fields.Int()
  roomname = fields.String()
  questions = fields.Nested(QuestionsSch)

class QuestionsSch(Schema):
  question1 = fields.List()
  question2 = fields.List()