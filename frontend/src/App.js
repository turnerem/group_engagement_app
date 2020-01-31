import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header/Header";
import SignIn from "./components/SignInForm/SignIn";
import ViewSessions from "./components/ViewSessions/ViewSessions";
import RegisterUser from "./components/RegisterUser/RegisterUser";

class App extends Component {
  state = {
    signedInUser: false
  };

  render() {
    const { signedInUser } = this.state;
    console.log(signedInUser);
    return (
      <div className="App">
        <p className="component-identifier">app component</p>
        <Header signedInUser={signedInUser} signUserOut={this.signUserOut} />
        <Router>
          <SignIn path="/signIn" signUserIn={this.signUserIn} />
          <ViewSessions path="/my-sessions" signedInUser={signedInUser} />
          <RegisterUser path="/register" />
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
