import React from "react";
import "./WaitingForQuestion.css";

const WaitingForQuestion = () => {
  return (
     <> <p>waiting for questions</p>
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
