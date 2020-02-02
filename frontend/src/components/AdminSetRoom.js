import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class AdminSetRoom extends Component {
  state = {
    sessionCodeInput: "",
    roomSet: false
  };

  render() {
      const {sessionCodeInput, roomSet} = this.state

    if (roomSet) {
      return (
        <div>
          {" "}
          <p>You have set the room </p>
          <button onClick={this.resetRoom}>reset</button>{" "}
        </div>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter The Room Code:{" "}
          <input
            value={sessionCodeInput}
            onChange={this.handleChange}
            type="text"
          ></input>
          <button type="submit">Submit</button>
        </label>
      </form>
    );
  }
  handleChange = event => {
    const { value } = event.target;
    this.setState({ sessionCodeInput: value });
  };

  handleSubmit = event => {
    const { sessionCodeInput } = this.state;
    event.preventDefault();
    this.setSessionListener(sessionCodeInput);
    this.setState({ sessionCodeInput: "", roomEntered: true });
  };

  setSessionListener = sessionCode => {
    const { endpoint } = this.props;
    const socket = socketIOClient(endpoint);
    socket.emit(`${sessionCode}`, "session code set");
  };

  resetRoom = () => {
    this.setState({ roomSet: false });
  };
}

export default AdminSetRoom;
