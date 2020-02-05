import React, { useState } from "react";
import "./AudienceQuestionCard.css";
import socketIOClient from "socket.io-client";

const AudienceQuestionCard = ({
  currentQuestion: {
    question: { question, type, answers },
    index
  },
  endpoint
}) => {
  const [answerGiven, setAnswerGiven] = useState("");
  const socket = socketIOClient(endpoint);

  const CardTemplate = buttons => (
    <div className="audience-card-container">
      <p>{question} look!</p>
      {buttons}
    </div>
  );

  const handleSubmit = answer => {
    socket.emit("answer given", { answer, index });
    // checks if answer has already been given, does the things
    console.log("handleSubmit >> ", answer);
    if (answerGiven === "") {
      //check if first time voting
      setAnswerGiven(answer);
    } else {
    }
  };

  const sendAnswer = () => {
    // send +1 of answer *and* store given answer in state
    // emit('given answer')
    // listen 'given' => +1 whatever the string is
  };

  const undoAnswer = () => {
    //send -1 of prev given answer (which is held in state)
    // emit('undo answer')
    // listen undo => -1 whatever the string is
  };

  if (type === "simple") {
    console.log("is simeple!");
    return CardTemplate(
      <>
        <button
          className="audience-yes-btn"
          onClick={() => handleSubmit("yes")}
        >
          yes
        </button>

        <button className="audience-no-btn" onClick={() => handleSubmit("no")}>
          no
        </button>
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
        {Object.keys(answers).map(answer => {
          return <button>{answer}</button>;
        })}
      </>
    );
  }
};

export default AudienceQuestionCard;
