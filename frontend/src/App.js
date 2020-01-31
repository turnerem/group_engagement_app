import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header";
import SignIn from "./components/SignInForm/SignIn";

class App extends Component {
  state = {
    signedInUser: false
  };

  render() {
    const { signedInUser } = this.state;
    return (
      <div className="App">
        <p className="component-identifier">app component</p>
        <Header signedInUser={signedInUser} signUserOut={this.signUserOut} />
        <Router>
          <SignIn path="/signIn" signUserIn={this.signUserIn} />
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
