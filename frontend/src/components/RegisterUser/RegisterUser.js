import React, { useState } from "react";
import "./RegisterUser.css";

const RegisterUser = () => {
  const [userName, setUserName] = useState("");

  const handleChange = ({ target: { value } }) => setUserName(value);

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div id="register-container">
      <p className="component-identifier">register component</p>

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
