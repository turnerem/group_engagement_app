import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header/Header";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import Home from "./components/Home/Home";
import ViewSessions from "./components/ViewSessions/ViewSessions";
import CreateSession from "./components/CreateSession/CreateSession";
import PresenterView from "./components/PresenterView/PresenterView";
import Audience from "./components/Audience/Audience";

import { URL } from "./config_url"

class App extends Component {
  state = {
    signedInUser: "JessJelly",
    endpoint: URL
  };

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
          <Audience path="/joined-session/:room_code" endpoint={endpoint} />
        </Router>
      </div>
    );
  }

  signUserIn = user => {
    this.setState({ signedInUser: user });
  };

  signUserOut = () => {
    this.setState({ signedInUser: false });
  };
}

export default App;
