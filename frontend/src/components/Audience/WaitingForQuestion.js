import React from "react";
import "./WaitingForQuestion.css";

const WaitingForQuestion = () => {
  return (
    <div className="loading-container">
      <p>waiting for questions</p>
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default WaitingForQuestion;
