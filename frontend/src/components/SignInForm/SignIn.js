import React, { Component } from "react";
import "./SignIn.css";
import { Link, navigate } from "@reach/router";

class SignIn extends Component {
  state = {
    userNameInput: ""
  };

  render() {
    const { userNameInput } = this.state;
    return (
      <div id="signin-container">
        <form onSubmit={this.handleSubmit} id="signin-form">
          {/* <p className="component-identifier">Signin component</p> */}

          <h4>Log in</h4>
          <span>Create/edit a session</span>

          <label htmlFor="signin-input" id="signin-title">
            Username:
          </label>
          <input
            value={userNameInput}
            onChange={this.handleChange}
            type="text"
            id="signin-input"
            placeholder="JessJelly"
          ></input>
          <button type="submit" id="signin-btn">
            Log in
          </button>
        </form>
        <p>Don't have an account yet?</p>
        <Link to="/register" id="create-account-link">
          <p>Create an account</p>
        </Link>
        <Link to="/theidea">
          <button className="aux-button">
            <i className="far fa-lightbulb fa-2x"></i>
            <span>The idea</span>
          </button>
        </Link>
        <Link to="/code">
          <button className="aux-button">
            <i className="fab fa-github fa-2x"></i>
            <span>The code</span>
          </button>
        </Link>
      </div>
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
    navigate("/sessions");
  };
}

export default SignIn;
