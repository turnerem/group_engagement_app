import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import socketIOClient from "socket.io-client";
import Header from "./components/Header/Header";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import Home from "./components/Home/Home";
import ViewSessions from "./components/ViewSessions/ViewSessions";
import CreateSession from "./components/CreateSession/CreateSession";
import PresenterView from "./components/PresenterView/PresenterView";
import Audience from "./components/Audience/Audience";

class App extends Component {
  state = {
    signedInUser: "JessJelly",
    endpoint: "http://192.168.100.127:5000/"
  };

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("test event", data => {
      console.log(data, "data logged");
    });
  }

  render() {
    // const { endpoint } = this.state;
    const { signedInUser, endpoint } = this.state;
    console.log("user signed in?", signedInUser);
    return (
      <div className="App">
        {/* <p className="component-identifier">app component</p> */}
        <Header signedInUser={signedInUser} signUserOut={this.signUserOut} />
        <Router>
          <Home signUserIn={this.signUserIn} default />
          <RegisterUser path="/register" />
          <ViewSessions path="/sessions" signedInUser={signedInUser} />
          <CreateSession path="/create-session" signedInUser={signedInUser} />
          <PresenterView
            path="/sessions/:session_name"
            signedInUser={signedInUser}
            endpoint={endpoint}
          />
          <Audience path="/joined-session/:room_code" />
        </Router>
        <button className="prompt-btn" onClick={this.sendQuestion}>
          Prompt
        </button>
      </div>
    );
  }

  sendQuestion = event => {
    const { endpoint, sessionData } = this.state;
    console.log("hey");
    const socket = socketIOClient(endpoint);
    socket.emit("presenter", "hey");
  };

  socketTest = event => {
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.emit("btn click", "connected to react");
  };

  signUserIn = user => {
    this.setState({ signedInUser: user });
  };

  signUserOut = () => {
    this.setState({ signedInUser: false });
  };
}

export default App;

{
  /* <Router>
          <SignIn
            path="/signIn"
            signUserIn={this.signUserIn}
            signUserOut={this.signUserOut}
          />
          {/* <StudentSessionCode path="/join-session" endpoint={endpoint} /> */
}
{
  /* <AdminSetRoom path="/admin-set-room" endpoint={endpoint} />
          <ViewSessions path="/my-sessions" signedInUser={signedInUser} />
          <PresenterView
            path="/my-sessions/:session_name"
            signedInUser={signedInUser}
          />
          <RegisterUser path="/register" />
          <CreateSession path="/create-session" />
        </Router>
        <button onClick={this.socketTest}>test socket</button> */
}
