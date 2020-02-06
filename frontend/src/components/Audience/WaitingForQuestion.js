import React from "react";
import "./WaitingForQuestion.css";

const WaitingForQuestion = () => {
  return (
    <>
      {" "}
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
