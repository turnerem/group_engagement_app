import React from "react";
import "./PromptQuestionCard.css";
import socketIOClient from "socket.io-client";
// import formatQuestionForAudience from '../../utils/utils'

const PromptQuestionCard = props => {
  const sendQuestion = event => {
    const { endpoint, sessionData } = props;
    console.log(endpoint);
    const socket = socketIOClient(endpoint);
    socket.emit("presenter", sessionData);
  };

  const { question, answers } = props;
  // console.log(question);
  return (
    <li className="prompt-question-container">
      <div className="prompt-question-info">
        <p>{question.question}</p>
        <ul>
          {Object.keys(question.answers).map(answer => {
            return <li key={answer}>{answer}</li>;
          })}
        </ul>
      </div>
      <button className="prompt-btn" onClick={sendQuestion}>
        Prompt
      </button>
    </li>
  );
};

export default PromptQuestionCard;
