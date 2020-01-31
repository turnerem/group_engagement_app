# import flask and mongodb tools
from flask import Flask, request
from bson.json_util import dumps
from bson.objectid import ObjectId
import json
from flask import jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import pymongo

# setup app as flask server
app = Flask(__name__)
CORS(app)

# config to look at hosted mongodb database
db_password = "dancingb"
db_name = "meetings"

app.config["MONGO_URI"] = "mongodb+srv://douglashellowell:" + \
    db_password + "@cluster0-wvchx.mongodb.net/" + db_name
mongo = PyMongo(app)


# On root request
@app.route('/api', methods=['POST'])
def add_new_user():
    print('post request made - add_new_user')
    print('attempting to load json')
    new_user = json.loads(request.data)
    # {username: 'humanoid_gregory'}
    # print(new_user)
    # print('attemting to add "sessions" list')
    new_user['sessions'] = []
    print(new_user)

    target_collection = mongo.db[new_user['user_name']]
    print('sending to db.............')
    result = target_collection.insert_one(new_user)

    return jsonify({"new_user_id": str(result.inserted_id)})


@app.route('/api/<user_name>', methods=['GET', 'POST'])
def add_session(user_name):
    if(request.method == 'GET'):
        print('GET request made to /' + user_name)
        target_collection = mongo.db[user_name]
        print('made target_collection')
        cursor_obj = target_collection.find({}, {'_id': 0})
        print('found something')
        result = []
        for x in cursor_obj:
            print('x part')
            result.append(x)
        return jsonify(result[0])
        # obj = next(cursor_obj, None)
        # if obj:
        #     print(obj)
        
    elif(request.method == 'POST'):
        print('post request made - add_session')
        new_session = json.loads(request.data)
        # {"session_name": "how to be a human"}
        print(new_session)

        target_collection = mongo.db[user_name]
        result = target_collection.update_one(
            {"user_name": user_name},
            {"$push": {'sessions': new_session}}
        )
        return jsonify({"Did work? ": result.modified_count})


@app.route('/api/<user_name>/<session_name>', methods=['GET'])
def add_question(user_name, session_name):
        print('\n\nget req made to ' + user_name + '/' + session_name)
        target_collection = mongo.db[user_name]
        cursor_obj = target_collection.find(
            {'sessions.session_name': session_name},
            {'_id': 0, 'sessions.$': 1}
        )
        result = []
        print(cursor_obj, 'the cursor')
        for x in cursor_obj:
            print(x)
            result.append(x)
            return jsonify(result[0])


@app.route('/api/<user_name>/<session_name>', methods=['PATCH'])
def update_session(user_name, session_name):
        print('a patch request to session', session_name)
        new_session = json.loads(request.data)
        print(new_session)
        target_collection = mongo.db[user_name]
        result = target_collection.update_one(
            {"user_name": user_name, "sessions.session_name": session_name},
            {"$set": {"sessions.questions": new_session}}
        )


if __name__ == '__main__':
    # threaded option to enable muptiple instances for multiple user access support (?!?!)
    app.run(threaded=True, port=5000)
# flask request methods

#     request.args: the key/value pairs in the URL query string

#     request.form: the key/value pairs in the body, from a HTML post form, or JavaScript request that isn't JSON encoded

#     request.files: the files in the body, which Flask keeps separate from form. HTML forms must use enctype=multipart/form-data or files will not be uploaded.

#     request.values: combined args and form, preferring args if keys overlap

#     request.json: parsed JSON data. The request must have the application/json content type, or use request.get_json(force=True) to ignore the content type.

# All of these are MultiDict instances (except for json). You can access values using:

#     request.form['name']: use indexing if you know the key exists

#     request.form.get('name'): use get if the key might not exist

#     request.form.getlist('name'): use getlist if the key is sent multiple times and you want a list of values. get only returns the first value.