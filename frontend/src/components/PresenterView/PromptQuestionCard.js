import React from "react";
import "./PromptQuestionCard.css";
import socketIOClient from "socket.io-client";
// import formatQuestionForAudience from '../../utils/utils'

const PromptQuestionCard = ({ question, type, endpoint, index }) => {
  const socket = socketIOClient(endpoint);
  const sendQuestion = event => {
    console.log(question, "question");
    console.log(type, "type");
    socket.emit("presenter prompt", { question, index });
  };

  const endPrompt = () => {
    socket.emit("end prompt", "sent");
  };

  console.log(question);
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
      <button className="end-prompt-btn" onClick={endPrompt}>
        End Prompt
      </button>
    </li>
  );
};

export default PromptQuestionCard;
