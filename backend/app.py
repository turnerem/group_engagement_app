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
@app.route('/', methods=['GET', 'POST', 'PATCH'])
def home():
    print('~~~~~request made to root~~~~~')
    # This could be user/account name - which will target users personal collection
    # e.g
    # collection_name = "dougs_lectures"
    collection_name = "dancingb"
    target_collection = mongo.db[collection_name]

    if request.method == 'GET':
        print('Get request made!')
        # point to 'collectionone' collection
        output = []
        # iterate over the documents and translate id to readable string
        for item in target_collection.find():
            item['_id'] = str(item['_id'])
            output.append(item)
        # return jsonify'd result
        return jsonify({'result': output})
    elif request.method == 'POST':
        try:
            print('Post request made!')
            parsed_json = json.loads(request.data)
            result = target_collection.insert_one(parsed_json)
            print('*****SUCCESS******')
            return jsonify({'posted_room_id': str(result.inserted_id)})
        except:
            print('Post request failed :(')
            return '''<p> :( </p>'''
        finally:
            print('request ended')
    elif request.method == 'PATCH':
        try:
            print(request)
            # parse json with loads()
            parsed_json = json.loads(request.data)
            print('trying to post data...')
            target_room = parsed_json['target_room']
            questions_to_add = parsed_json['questions_to_add']
            target_collection.update_one(
                filter={'roomName': target_room},
                update={
                    '$push': {"questions": questions_to_add}}
            )
            print('********SUCCESS************')

            return '''
            <h1> BLOODY SUCCESS</h1>
            <p> thank heck </p> 
            '''
        except:
            print('failed to add data! :(')
            return '''
            <h1> Fail </h1>
            <p>keep trying, you can do it!<p>
            '''
        finally:
            print('request ended')


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
