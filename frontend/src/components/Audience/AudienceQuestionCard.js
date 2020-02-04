import React from "react";
import "./AudienceQuestionCard.css";
import { formatQuestionForAudience } from "../../utils/utils";

const AudienceQuestionCard = ({ currentQuestion }) => {
  const [questionTitle, answers] = formatQuestionForAudience(currentQuestion);
  const type = "simple";
  console.log(answers);

  const CardTemplate = buttons => (
    <div className="audience-card-container">
      <p>{questionTitle}</p>
      {buttons}
    </div>
  );

  if (type === "simple") {
    console.log("is simeple!");
    return CardTemplate(
      <>
        <button className="audience-yes-btn">yes</button>
        <button className="audience-no-btn">no</button>
      </>
    );
  }

  if (type === "text") {
    console.log("is text!");

    return CardTemplate(
      <>
        <input></input>
        <button className="audience-submit-btn">submit</button>
      </>
    );
  }

  if (type === "multi") {
    console.log("is multi!");

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
