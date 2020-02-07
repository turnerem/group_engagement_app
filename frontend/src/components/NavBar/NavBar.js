import React from "react";
import { Link } from "@reach/router";
import "./NavBar.css";

function NavBar(props) {
  const handleSignOut = () => {};

  if (!props.signedInUser)
    return (
      <nav id="app-nav">
        {/* <p className="component-identifier">nav component</p> */}

        <Link to={"/register"}>
          <p> New User </p>
        </Link>
        <Link to={"/signIn"}>
          {" "}
          <p>Sign in</p>
        </Link>
        <Link to={"/join-session"}>
          <p>Join a session</p>
        </Link>
      </nav>
    );
  else
    return (
      <div>
        <Link to={"/home"}>
          {" "}
          <p>Home </p>{" "}
        </Link>
        <Link to={"/create-session"}>
          <p>Create new Session</p>
        </Link>
        <Link to={"/my-sessions"}>
          <p>View your Sessions</p>
        </Link>
        <Link to={"/home"}>
          {" "}
          <p onClick={handleSignOut}>{`welcome ${props.signedInUser}`}</p>{" "}
        </Link>
      </div>
    );
}

export default NavBar;
