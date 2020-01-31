import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class StudentSessionCode extends Component {
  state = {
    sessionCodeInput: "",
    roomEntered: false
  };

  render() {
    const { sessionCodeInput, roomEntered } = this.state;
    if (roomEntered) {
      return (
        <div>
          {" "}
          <p>You have entered a room </p>
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
    socket.emit(`${sessionCode}`, "session code correct");
  };

  resetRoom = () => {
    this.setState({ roomEntered: false });
  };
}

export default StudentSessionCode;
