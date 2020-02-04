import "./Audience.css";
import React, { Component } from "react";
import AudienceQuestionCard from "./AudienceQuestionCard";

class Audience extends Component {
  state = {
    currentQuestion: {
      "Shall we use dogs and paper instead?": {
        answers: []
      }
    }
  };

  componentDidMount() {
    console.log(`...mounting:`);
    console.log(
      `%c room_code: ${this.props.room_code}`,
      "background:#000; color:#bada55;"
    );
  }

  render() {
    const { room_code } = this.props;
    const { currentQuestion } = this.state;
    console.log(`...rendering: `);
    console.log(`%c room_code: ${room_code}`, "background:#000; color:red;");
    return (
      <div className="audience-view-container">
        <p>room_code: {room_code}</p>
        <p>You are in a room with _*_ others</p>
        <AudienceQuestionCard currentQuestion={currentQuestion} />
      </div>
    );
  }
}

export default Audience;
