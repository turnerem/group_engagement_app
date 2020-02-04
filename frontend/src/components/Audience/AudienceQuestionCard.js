import React from "react";
import "./AudienceQuestionCard.css";
import { formatQuestionForAudience } from "../../utils/utils";

const AudienceQuestionCard = ({ currentQuestion }) => {
  const [questionTitle, answers, type] = formatQuestionForAudience(
    currentQuestion
  );
  console.log(questionTitle, answers, type);

  const CardTemplate = buttons => (
    <div className="audience-card-container">
      <p>{questionTitle}</p>
      {buttons}
    </div>
  );

  if (type === "simple") {
    return CardTemplate(
      <>
        <button>Yes</button>
        <button>No</button>
      </>
    );
  }

  if (type === "text") {
    return CardTemplate(
      <>
        <input type="text" />
        <button>submit</button>
      </>
    );
  }

  if (type === "multi") {
    return CardTemplate(
      <>
        {answers.map(answer => {
          return <button>{answer}</button>;
        })}
      </>
    );
  }
};

export default AudienceQuestionCard;
