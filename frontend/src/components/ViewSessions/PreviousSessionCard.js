import React from "react";
import "./PreviousSessionCard.css";

const PreviousSessionCard = ({ session }) => {
  const { session_name, questions, date_presented } = session;
  return (
    <div className="previous-session-card">
      <div className="previous-session-card-info">
        <p className="session-name">{session_name}</p>
        <p className="session-question-card">{questions.length} questions</p>
        <p className="session-time">
          Finished : {date_presented.toString().slice(0, -30)}
        </p>
      </div>
      <button className="previous-analysis-btn">Analysis</button>
    </div>
  );
};

export default PreviousSessionCard;
