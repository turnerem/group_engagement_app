import React from "react";
import "./Header.css";
import { Link } from "@reach/router";

function Header(props) {
  return (
    <header id="app-header">
      <Link to="/">
        <h1>
          <span id="askfast">_anonym</span> <span id="fastans">_ask</span>
        </h1>
      </Link>
    </header>
  );
}

export default Header;
