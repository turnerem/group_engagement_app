import React from "react";
import "./SavedQuestion.css";

const SavedQuestion = ({ question, index }) => {

  const QuestionTemplate = answers => {
      return (
    <li className="saved-question-li">
      <p className='saved-question-index'>Question {index + 1}</p>
      <p className="saved-question-title">{Object.keys(question)[0]}</p>
      {answers}
    </li>

      )
  };

  console.log(question);
  if (question.type === "simple") {
    return QuestionTemplate(
      <ul>
        <li>Yes</li>
        <li>No</li>
      </ul>
    );
  }

  if (question.type === "text") {
    return QuestionTemplate(<p> Type: text</p>);
  }

  if (question.type === "multi") {
    return QuestionTemplate(
      <ul>
        {Object.values(question)[0].map(answer => {
          return <li>{answer}</li>;
        })}
      </ul>
    );
  }
};

export default SavedQuestion;
