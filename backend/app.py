# import flask and mongodb tools
from flask import Flask, request
from bson.json_util import dumps
from bson.objectid import ObjectId
import json
from flask import jsonify
from flask_pymongo import PyMongo
import pymongo

# setup app as flask server
app = Flask(__name__)
# config to look at hosted mongodb database
db_password = "dancingb"
db_name = "meetings"

app.config["MONGO_URI"] = "mongodb+srv://douglashellowell:" + \
    db_password + "@cluster0-wvchx.mongodb.net/" + db_name
mongo = PyMongo(app)


# On root request
@app.route('/', methods=['POST'])
def add_new_user():
    print('post request made - add_new_user')
    print('attempting to load json')
    new_user = json.loads(request.data)
    # {username: 'humanoid_gregory'}
    print(new_user)
    print('attemting to add "sessions" list')
    new_user['sessions'] = []
    print(new_user)

    target_collection = mongo.db[new_user['username']]
    print('sending to db.............')
    result = target_collection.insert_one(new_user)

    return jsonify({"new_user_id": str(result.inserted_id)})


@app.route('/<user_name>', methods=['GET', 'POST'])
def add_session(user_name):
    if(request.method == 'GET'):
        print('GET request made to /' + user_name)
        target_collection = mongo.db[user_name]
        cursor_obj = target_collection.find({}, {'_id': 0})
        result = []
        for x in cursor_obj:
            result.append(x)
        return jsonify({'Result': result})
    elif(request.method == 'POST'):
        print('post request made - add_session')
        new_session = json.loads(request.data)
        # {"session_name": "how to be a human"}
        print(new_session)
        print('attempting to add "questions" list')
        new_session["questions"] = []
        print(new_session)

        target_collection = mongo.db[user_name]
        result = target_collection.update_one(
            {"username": user_name},
            {"$push": {'sessions': new_session}}
        )
        return jsonify({"Did work? ": result.modified_count})


@app.route('/<user_name>/<session_name>', methods=['GET', 'POST'])
def add_question(user_name, session_name):
    if(request.method == 'GET'):
        print('get req made to ' + user_name + '/' + session_name)
        target_collection = mongo.db[user_name]
        cursor_obj = target_collection.find(
            {'sessions.session_name': session_name},
            {'_id': 0, 'sessions.$': 1}
        )
        result = []
        for x in cursor_obj:
            result.append(x)
            return jsonify({'session': result[0]})
    elif(request.method == 'POST'):
        print('post request made - add_quastion')
        new_question = json.loads(request.data)
        new_question['answers'] = []
        print(new_question)
        target_collection = mongo.db[user_name]
        result = target_collection.update_one(
            {"username": user_name, "sessions.session_name": session_name},
            {"$push": {"sessions.$.questions": new_question}}
        )
        return jsonify({"Did work? ": result.modified_count})

    # print('~~~~~request made to root~~~~~')
    # # This could be user/account name - which will target users personal collection
    # # e.g
    # # collection_name = "dougs_lectures"
    # collection_name = "dancingb"
    # target_collection = mongo.db[collection_name]
    # if request.method == 'GET':
    #     print('Get request made!')
    #     # point to 'collectionone' collection
    #     output = []
    #     # iterate over the documents and translate id to readable string
    #     for item in target_collection.find():
    #         item['_id'] = str(item['_id'])
    #         output.append(item)
    #     # return jsonify'd result
    #     return jsonify({'result': output})
    # elif request.method == 'POST':
    #     try:
    #         print('Post request made!')
    #         parsed_json = json.loads(request.data)
    #         result = target_collection.insert_one(parsed_json)
    #         print('*****SUCCESS******')
    #         return jsonify({'posted_room_id': str(result.inserted_id)})
    #     except:
    #         print('Post request failed :(')
    #         return '''<p> :( </p>'''
    #     finally:
    #         print('request ended')
    # elif request.method == 'PATCH':
    #     try:
    #         print(request)
    #         # parse json with loads()
    #         parsed_json = json.loads(request.data)
    #         print('trying to post data...')
    #         target_room = parsed_json['target_room']
    #         questions_to_add = parsed_json['questions_to_add']
    #         target_collection.update_one(
    #             filter={'roomName': target_room},
    #             update={
    #                 '$push': {"questions": questions_to_add}}
    #         )
    #         print('********SUCCESS************')
    #         return '''
    #         <h1> BLOODY SUCCESS</h1>
    #         <p> thank heck </p>
    #         '''
    #     except:
    #         print('failed to add data! :(')
    #         return '''
    #         <h1> Fail </h1>
    #         <p>keep trying, you can do it!<p>
    #         '''
    #     finally:
    #         print('request ended')


@app.route('/<user>/<session_id>', methods=['GET', 'POST'])
def getSingleRoom(user, session_id):
    print('~~~~~ making request for single room ~~~~~~')
    print('user: ' + user + ', session_id: ' + session_id)
    target_collection = mongo.db[user]
    if(request.method == 'GET'):
        result = target_collection.find_one(
            {'_id': ObjectId(session_id)})
        # below will crash on no result - cannot stringify 'NoneType'
        result['_id'] = str(result['_id'])
        return jsonify(result)
    if(request.method == 'POST'):
        # /dancingb/
        print('Post request made!')

    return '''<h1> you made a good get request there friend! </h1>'''


app.run(host='0.0.0.0')

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
