import React from "react";
import NavBar from "./NavBar";

function Header(props) {
  const { signedInUser, signUserOut } = props;

  return (
    <div>
      <h1>AskFast & FastAsk</h1>
      <NavBar signedInUser={signedInUser} signUserOut={signUserOut} />
    </div>
  );
}

export default Header;
