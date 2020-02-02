import React from "react";
// import NavBar from "../NavBar/NavBar";
import "./Header.css";
import {Link} from '@reach/router'

function Header(props) {
  const { signedInUser, signUserOut } = props;

  return (
    <header id="app-header">
      {/* <p className="component-identifier">header component</p> */}
      <Link to='/'>
        <h1><span id="askfast">AskFast</span> <span id="fastans">FastAns</span></h1>
      </Link>
      {/* <NavBar signedInUser={signedInUser} signUserOut={signUserOut} /> */}
    </header>
  );
}

export default Header;
