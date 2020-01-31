import React, { Component } from "react";
import "./SignIn.css";

class SignIn extends Component {
  state = {
    userNameInput: ""
  };

  render() {
    const { userNameInput } = this.state;
    return (
      <form onSubmit={this.handleSubmit} id="signin-form">
        <label>
          Enter your username:{" "}
          <input
            value={userNameInput}
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
    this.setState({ userNameInput: value });
  };

  handleSubmit = event => {
    const { signUserIn } = this.props;
    const { userNameInput } = this.state;
    event.preventDefault();
    signUserIn(userNameInput);
    this.setState({ userNameInput: "" });
  };
}

export default SignIn;
