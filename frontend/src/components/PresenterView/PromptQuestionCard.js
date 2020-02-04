import React from "react";
import "./PromptQuestionCard.css";
import socketIOClient from "socket.io-client";
// import formatQuestionForAudience from '../../utils/utils'

const PromptQuestionCard = ({ question, answers, type }) => {
  console.log(answers, 'answers is an object?');
  // ['the question?', ['yes', 'no'], 'simple]
  const toVoters = [question, answers, type]
  return (
      <li className="prompt-question-container">
        <div className="prompt-question-info">
          <p>{question}</p>
          <ul>
            {answers.map(answer => {
              return <li key={answer}>{answer}</li>;
            })}
          </ul>
        </div>
        <button className="prompt-btn">Prompt</button>
      </li>

  // sendQuestion = event => {};

  // return (
  //   <li className="prompt-question-container">
  //     <div className="prompt-question-info">
  //       <p>{question}</p>
  //       <ul>
  //         {Object.keys(answers).map(answer => {
  //           return <li key={answer}>{answer}</li>;
  //         })}
  //       </ul>
  //     </div>
  //     <button className="prompt-btn" onClick={}>
  //       Prompt
  //     </button>
  //   </li>
  );
};

export default PromptQuestionCard;
