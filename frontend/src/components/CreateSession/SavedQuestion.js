import React from "react";
import "./SavedQuestion.css";

const SavedQuestion = ({ questionTitle, index }) => {

  const QuestionTemplate = answers => {
      return (
    <li className="saved-question-li">
      <p className='saved-question-index'>Question {index + 1}</p>
      <p className="saved-question-title">{Object.values(questionTitle)[0]}</p>
      {answers}
    </li>

      )
  };

  console.log(questionTitle);
  if (questionTitle.type === "simple") {
    return QuestionTemplate(
      <ul>
        <li>Yes</li>
        <li>No</li>
      </ul>
    );
  }

  if (questionTitle.type === "text") {
    return QuestionTemplate(<p> Type: text</p>);
  }

  if (questionTitle.type === "multi") {
    console.log('-->', questionTitle, '<---')
    const questionsObj = Object.values(questionTitle)[1]
    
    return QuestionTemplate(
      <ul>
        {Object.keys(questionsObj).map((answer,index) => {
          return <li key={index}>{answer}</li>;
        })}
      </ul>
    );
  }
};

export default SavedQuestion;
