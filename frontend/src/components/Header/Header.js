import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Header.css";

function Header(props) {
  const { signedInUser, signUserOut } = props;

  return (
    <header id="app-header">
      <p className="component-identifier">header component</p>
      <h1>AskFastAndFastAns</h1>
      <NavBar signedInUser={signedInUser} signUserOut={signUserOut} />
    </header>
  );
}

export default Header;
