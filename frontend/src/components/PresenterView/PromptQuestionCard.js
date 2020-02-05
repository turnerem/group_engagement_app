import React from "react";
import "./PromptQuestionCard.css";
import socketIOClient from "socket.io-client";
// import formatQuestionForAudience from '../../utils/utils'

const PromptQuestionCard = ({
  question,
  answers,
  type,
  endpoint,
  sessionData
}) => {
  const sendQuestion = event => {
    console.log(question, "question");
    console.log(type, "type");
    console.log(sessionData, "sessionData");
    console.log(answers, "answers");
    console.log(question, "question");
    const socket = socketIOClient(endpoint);
    socket.emit("prompt sent", sessionData);
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
    </li>
  );
};

export default PromptQuestionCard;
