import React, { Component } from "react";
import "./PresenterView.css";
import * as api from "../api";
import PromptQuestionCard from "./PromptQuestionCard";
import socketIOClient from "socket.io-client";
import WaitingForQuestion from "../Audience/WaitingForQuestion";

class PresenterView extends Component {
  state = {
    sessionData: {},
    isLoading: true
  };

  componentDidMount() {
    const { endpoint } = this.props;
    this.fetchSession();

    const socket = socketIOClient(endpoint, {
      transports: ["websocket"]
    });
    socket.on("answer to presenter", ({ answer, index, vote }) => {
      console.log("answer recieved from flask!");
      this.setState(currentState => {
        const newState = { ...currentState };
        console.log(newState);
        newState.sessionData.questions[index].answers[answer] += vote;
        return newState;
      });
    });
    socket.on("text to presenter", ({ textInput, index }) => {
      console.log("text recieved from flask!");
      this.setState(currentState => {
        const newState = { ...currentState };
        newState.sessionData.questions[index].answers.push(textInput);
        return newState;
      });
    });
  }

  render() {
    const { isLoading, sessionData } = this.state;
    const { sessionCode, endpoint } = this.props;
    console.log(sessionData);
    console.log(endpoint);
    if (isLoading) {
      return (
        <>
          <p id="loading-session">Loading Session....</p>
          <WaitingForQuestion />
        </>
      );
    }

    return (
      <div id="session-view-container">
        {/* <p className="component-identifier">PresenterView component</p> */}
        <div id="session-view-header">
          <h3>{sessionCode}</h3>
          <p>Abort Session</p>
        </div>
        <p>Connected users: _______</p>
        <div id="live-data-view">
          {sessionData.questions.map(question => {
            return <p>{JSON.stringify(question)}</p>;
          })}
        </div>
        <ul>
          {sessionData.questions &&
            sessionData.questions.map((question, index) => {
              console.log(sessionData);
              return (
                <PromptQuestionCard
                  endpoint={endpoint}
                  question={question}
                  key={question}
                  index={index}
                />
              );
            })}
        </ul>
      </div>
    );
  }

  fetchSession = () => {
    // console.log("fething sessions...");
    const { session_name } = this.props;

    console.log("SESSION ", session_name);
    api.getSingleSession("JessJelly", session_name).then(data => {
      console.log(data, "an array?");
      this.setState({ sessionData: data, isLoading: false });
    });
  };
}

export default PresenterView;
