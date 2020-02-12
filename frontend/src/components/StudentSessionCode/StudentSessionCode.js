import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./StudentSessionCode.css";

import { navigate } from "@reach/router";

class StudentSessionCode extends Component {
  state = {
    sessionCodeInput: "",
    roomEntered: false,
    wrongCode: false
  };

  render() {
    const { sessionCodeInput, roomEntered, wrongCode } = this.state;
    if (roomEntered) {
      return (
        <div id="student-session-code-container">
          {" "}
          <p>You have entered a room </p>
          <button onClick={this.resetRoom}>reset</button>{" "}
        </div>
      );
    }

    return (
      <div id="student-session-code-container">
        <h2 id="join-room-title">Join a room</h2>
        <span id="join-room-subtitle">
          Take part in someone else's session!
        </span>
        <form onSubmit={this.handleSubmit} id="join-room-form">
          <label htmlFor="join-room-input" id="join-room-label">
            Enter The Room Code:{" "}
          </label>
          {wrongCode && <p id="wrong-code-msg">Room code not in use</p>}
          <input
            value={sessionCodeInput}
            onChange={this.handleChange}
            type="text"
            id="join-room-input"
          ></input>
          <button type="submit" id="join-room-btn">
            Join a room
          </button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    // console.log('user click!')
    const { value } = event.target;
    this.setState({ sessionCodeInput: value });
  };

  handleSubmit = event => {
    console.log("user click!");

    const { sessionCodeInput, wrongCode } = this.state;
    event.preventDefault();
    // this.setSessionListener(sessionCodeInput);

    if (sessionCodeInput !== "hireus") {
      this.setState({ wrongCode: true });
    } else {
      this.setSessionListener(sessionCodeInput);
      // this.setState({ sessionCodeInput: "", roomEntered: true });
    }
  };

  setSessionListener = sessionCode => {
    const { endpoint } = this.props;
    const socket = socketIOClient(endpoint);
    socket.emit(`${sessionCode}`, "session code correct");
    navigate(`/joined-session/${sessionCode}`);
  };

  resetRoom = () => {
    this.setState({ roomEntered: false });
  };
}

export default StudentSessionCode;
