from flask import Flask, render_template
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app, cors_allowed_origins='*')


@app.route('/')
# def sessions():
#     return render_template('session.html')
def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')


# @socketio.on('my event')
# def handle_my_custom_event(json, methods=['GET', 'POST']):
#     print('received my event: ' + str(json))
#     socketio.emit('woosh', json, callback=messageReceived)

@socketio.on("user input")
def handle_my_custom_event(json, methods=['GET', 'POST']):
    socketio.emit('test event', 'hey back')
    print(str(json))


@socketio.on("session input")
def handle_my_custom_event(json, methods=['GET', 'POST']):
    socketio.emit('test event', 'hey back')
    print(str(json))


if __name__ == '__main__':
    socketio.run(app, debug=True)
