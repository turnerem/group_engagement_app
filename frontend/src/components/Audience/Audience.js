import "./Audience.css";
import React, { Component } from "react";

class Audience extends Component {
  state = {};

  componentDidMount() {
    console.log(`...mounting: `);
    console.log(
      `%c room_code: ${this.props.room_code}`,
      "background:#000; color:#bada55;"
    );
  }

  render() {
    const { room_code } = this.props;
    console.log(`...rendering: `);
    console.log(`%c room_code: ${room_code}`, "background:#000; color:red;");
    return (
      <div className="audience-view-container">
        <p>room_code: {room_code}</p>
        <p>You are in a room with ___ others</p>
      </div>
    );
  }
}

export default Audience;
