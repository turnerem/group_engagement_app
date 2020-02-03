import React, { useState } from "react";
import * as api from "../api";
import "./RegisterUser.css";
import { Link } from "@reach/router";

const RegisterUser = () => {
  const [userName, setUserName] = useState("");
  const [createdUser, setCreatedUser] = useState(undefined);
  const [error, setError] = useState(false);

  const handleChange = ({ target: { value } }) => setUserName(value);

  const handleSubmit = event => {
    event.preventDefault();
    // console.log("sending post request");
    // console.log(userName);
    api.postNewUser(userName).then(response => {
      // console.log("returned from api req, ", response);
      if (response.status === 201) {
        setError(false);
        setCreatedUser(userName);
      } else {
        setError(true);
      }
    });
  };

  return (
    <div id="register-container">
      {/* <p className="component-identifier">register component</p> */}
      {createdUser && <p>User '{createdUser}' Created!</p>}
      {error && <p>Error: User already exists, please try another name</p>}
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit} id="register-form">
        <label htmlFor="register-username-input">Username</label>
        <input
          name="username"
          onChange={handleChange}
          id="register-username-input"
        />
        <button id="register-btn">Create an account</button>
      </form>
      <Link to="/theidea">
        <button className="aux-button">
          <i class="far fa-lightbulb fa-2x"></i>
          <span>The idea</span>
        </button>
      </Link>
      <Link to="/code">
        <button className="aux-button">
          <i class="fab fa-github fa-2x"></i>
          <span>The code</span>
        </button>
      </Link>
    </div>
  );
};

export default RegisterUser;
