import React from "react";
import "./PromptQuestionCard.css";
import socketIOClient from "socket.io-client";
// import formatQuestionForAudience from '../../utils/utils'

const PromptQuestionCard = ({ question, type, activeQIdx, endpoint, index }) => {
  const socket = socketIOClient(endpoint);
  const sendQuestion = (event, cb) => {
    console.log("prompying question");
    socket.emit("presenter prompt", { question, index });
    cb(index)
  };

  const endPrompt = () => {
    socket.emit("end prompt", "sent");
  };

  // console.log(question);
  return (
    <li className="prompt-question-container">
      <div className="prompt-question-info">
        <p className='prompt-question-title'>{question.question}</p>
        <ul>
          {Object.keys(question.answers).map((answer, index) => {
            return <li key={answer}>{answer}: {Object.values(question.answers)[index]} </li>;
          })}
        </ul>
      </div>
      <div className="prompt-btn-container">
        <button className="prompt-btn" onClick={(event) => {
          
          sendQuestion(event, activeQIdx)
          }}>
          Prompt
        </button>
        <button className="end-prompt-btn" onClick={endPrompt}>
          End Prompt
        </button>
      </div>
    </li>
  );
};

export default PromptQuestionCard;
