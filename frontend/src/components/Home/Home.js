import React from "react";
import StudentSessionCode from "../StudentSessionCode/StudentSessionCode";
import SignIn from "../SignInForm/SignIn";
import "./Home.css";

const Home = props => {
  return (
    <div id="home-container">
      <StudentSessionCode id="session-code" />
      <SignIn signUserIn={props.signUserIn} />
    </div>
  );
};

export default Home;
