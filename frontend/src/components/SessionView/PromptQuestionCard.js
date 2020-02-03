import React from "react";
import "./PromptQuestionCard.css";

const PromptQuestionCard = ({ question, answers }) => {
  // console.log(answers);
  return (
    <div className="prompt-question-container">
      <div class="prompt-question-info">
        <p>{question}</p>
        <ul>
          {Object.keys(answers).map(answer => {
            return <li>{answer}</li>;
          })}
        </ul>
      </div>
      <button className="prompt-btn">Prompt</button>
    </div>
  );
};

export default PromptQuestionCard;
