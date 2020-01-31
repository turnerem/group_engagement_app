import React, { useState } from "react";
import * as api from "../api";
import "./RegisterUser.css";

const RegisterUser = () => {
  const [userName, setUserName] = useState("");
  const [createdUser, setCreatedUser] = useState(undefined);
  const [error, setError] = useState(false);

  const handleChange = ({ target: { value } }) => setUserName(value);

  const handleSubmit = event => {
    event.preventDefault();
    console.log("sending post request");
    console.log(userName);
    api.postNewUser(userName).then(response => {
      console.log("returned from api req, ", response);
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
      <p className="component-identifier">register component</p>
      {createdUser && <p>User '{createdUser}' Created!</p>}
      {error && <p>Error: User already exists, please try another name</p>}
      <form onSubmit={handleSubmit}>
        <label>
          New Username
          <input name="username" onChange={handleChange} />
        </label>
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;
