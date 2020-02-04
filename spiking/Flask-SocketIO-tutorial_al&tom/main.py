from flask import Flask, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, send, emit

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app, cors_allowed_origins='*')


@app.route('/')
@socketio.on("user input")
def handle_my_custom_event(json, methods=['GET', 'POST']):
    socketio.emit('test event', 'hey back')
    print(str(json))


@socketio.on("session input")
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('\n' + 'in the back end')
    socketio.emit('test event', 'hey back')
    print(str(json))


@socketio.on('presenter')
def handle_my_custom_event(data, methods=['GET', 'POST']):
    print('\n' + 'questionRecieved')
    socketio.emit('questionForStudent', data)


@socketio.on('responseFromStudent')
def handle_my_custom_event(data, methods=['GET', 'POST']):
    print('responseRecieved')
    socketio.emit('responseForPresenter', data)

# template for room joining


@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    print(str(data))
    send(username + ' has entered the room.', room=room)


if __name__ == '__main__':
    socketio.run(app, debug=True)
