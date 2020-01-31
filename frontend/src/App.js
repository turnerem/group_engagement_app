import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header";
import socketIOClient from "socket.io-client";
import StudentSessionCode from "./components/StudentSessionCode";
import SignIn from "./components/SignInForm/SignIn";
import ViewSessions from "./components/ViewSessions/ViewSessions";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import AdminSetRoom from "./components/AdminSetRoom";

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
        <p className="component-identifier">app component</p>
        <Header signedInUser={signedInUser} signUserOut={this.signUserOut} />
        <Router>
          <SignIn path="/signIn" signUserIn={this.signUserIn} />
          <StudentSessionCode path="/join-session" endpoint={endpoint} />
          <AdminSetRoom path="/my-sessions" endpoint={endpoint} />
          <ViewSessions path="/my-sessions" />
          <RegisterUser path="/register" />
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
