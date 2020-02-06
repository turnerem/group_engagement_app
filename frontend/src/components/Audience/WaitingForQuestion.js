import React from "react";
import "./WaitingForQuestion.css";

const WaitingForQuestion = () => {
  return (
    <>
      {" "}
      <p id="waiting-for-questions-text">waiting for questions</p>
      <div className="loading-container">
        <div className="loading">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default WaitingForQuestion;
