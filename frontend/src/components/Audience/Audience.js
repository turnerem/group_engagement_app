import "./Audience.css";
import React, { Component } from "react";
import AudienceQuestionCard from "./AudienceQuestionCard";
import WaitingForQuestion from "./WaitingForQuestion";

class Audience extends Component {
  state = {
    currentQuestion: {
      "Shall we use dogs and paper instead?": {
        yes: 0,
        no: 0
      }
    },

    isWaiting: true
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
    const { currentQuestion, isWaiting } = this.state;
    console.log(`...rendering: `);
    console.log(`%c room_code: ${room_code}`, "background:#000; color:red;");
    return (
      <div className="audience-view-container">
        <p>room_code: {room_code}</p>
        <p>You are in a room with _*_ others</p>
        {isWaiting ? (
          <WaitingForQuestion />
        ) : (
          <AudienceQuestionCard currentQuestion={currentQuestion} />
        )}
      </div>
    );
  }

  setQuestion = () => {
    // this is to be set on socket event 'question prompted' (or whatever)
    this.setState({
      currentQuestion: {
        "Alex to make this filled on socket event": { answer1: 0, answer2: 0 }
      },
      isWaiting: false
    });
  };

  removeQuestion = () => {
    // This is to be set on socket event 'stop prompt' (or whatever)
    this.setState({ currentQuestion: false, isWaiting: true });
  };
}

export default Audience;
