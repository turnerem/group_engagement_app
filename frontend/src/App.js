import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import socketIOClient from "socket.io-client";
import StudentSessionCode from "./components/StudentSessionCode";

class App extends Component {
  state = {
    signedInUser: false,
    endpoint: "http://localhost:5000"
  };

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("test event", data => {
      console.log(data, "data logged");
    });
  }

  render() {
    const { endpoint } = this.state;
    const { signedInUser } = this.state;
    return (
      <div className="App">
        <Header signedInUser={signedInUser} signUserOut={this.signUserOut} />
        <Router>
          <SignIn path="/signIn" signUserIn={this.signUserIn} />
          <StudentSessionCode path="/join-session" endpoint={endpoint} />
        </Router>
        <button onClick={this.socketTest}>test socket</button>
      </div>
    );
  }

  socketTest = event => {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    socket.emit("btn click", "connected to react");
  };

  signUserIn = user => {
    this.setState({ signedInUser: user });
  };

  signUserOut = () => {
    this.setState({ signedInUser: false });
  };
}

export default App;
