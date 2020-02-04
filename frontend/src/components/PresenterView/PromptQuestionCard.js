import React from "react";
import "./PromptQuestionCard.css";
// import formatQuestionForAudience from '../../utils/utils'

const PromptQuestionCard = ({ question, answers }) => {
  // console.log(answers);
  // ['the question?', ['yes', 'no'], 'simple]
  // const toVoters = [question, answers, formatQuestionForAudience(answers)]
  return (
      <li className="prompt-question-container">
        <div className="prompt-question-info">
          <p>{question}</p>
          <ul>
            {Object.keys(answers).map(answer => {
              return <li key={answer}>{answer}</li>;
            })}
          </ul>
        </div>
        <button className="prompt-btn">Prompt</button>
      </li>

    
  );
};

export default PromptQuestionCard;
