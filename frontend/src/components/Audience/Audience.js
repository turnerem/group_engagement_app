import "./Audience.css";
import React, { Component } from "react";
import AudienceQuestionCard from "./AudienceQuestionCard";
import WaitingForQuestion from "./WaitingForQuestion";
import socketIOClient from "socket.io-client";

class Audience extends Component {
  state = {
    currentQuestion: {},

    isWaiting: true
  };

  componentDidMount() {
    const { endpoint } = this.props;
    console.log(`...mounting:`);
    console.log(
      `%c room_code: ${this.props.room_code}`,
      "background:#000; color:#bada55;"
    );
    console.log(endpoint);
    const socket = socketIOClient(endpoint);
    socket.on("incoming question", question => {
      console.log("in socket on in audience");
      this.setQuestion(question);
    });

    socket.on("end question", () => {
      console.log("removeing question!");
      this.removeQuestion();
    });
  }

  render() {
    const { room_code, endpoint } = this.props;
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
          <AudienceQuestionCard
            currentQuestion={currentQuestion}
            endpoint={endpoint}
          />
        )}
      </div>
    );
  }

  setQuestion = question => {
    // this is to be set on socket event 'question prompted' (or whatever)
    console.log("question to be displayed:", question);
    this.setState({
      currentQuestion: question,
      isWaiting: false
    });
  };

  removeQuestion = () => {
    // This is to be set on socket event 'stop prompt' (or whatever)
    this.setState({ currentQuestion: false, isWaiting: true });
  };
}

export default Audience;
