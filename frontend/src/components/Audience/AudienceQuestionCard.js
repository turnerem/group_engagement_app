import React from "react";
import "./AudienceQuestionCard.css";
import { formatQuestionForAudience } from "../../utils/utils";

const AudienceQuestionCard = ({ currentQuestion }) => {
  const [questionTitle, answers, type] = formatQuestionForAudience(
    currentQuestion
  );

  const CardTemplate = buttons => (
    <div className="audience-card-container">
      <p>{questionTitle}</p>
    </div>
  );

  if (type === "simple") {
    return CardTemplate;
  }

  if (type === "text") {
    return (
      <div className="audience-card-container">
        <p>{questionTitle}</p>
      </div>
    );
  }
};

export default AudienceQuestionCard;
