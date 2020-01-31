import React from "react";
import { Link } from "@reach/router";

function NavBar(props) {
  const handleSignOut = () => {};

  if (!props.signedInUser)
    return (
      <div>
        <Link to={"/register"}>
          <p> New User </p>
        </Link>
        <Link to={"/signIn"}>
          {" "}
          <p>Sign in</p>
        </Link>
        <Link to={"/join-session"}>
          <p>join a session</p>
        </Link>
      </div>
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
