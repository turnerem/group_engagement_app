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
  const [textInput, setTextInput] = useState("");
  const socket = socketIOClient(endpoint);

  const CardTemplate = buttons => (
    <div className="audience-card-container">
      <p className="audience-card-question">{question}</p>
      {buttons}
    </div>
  );

  const handleSubmit = answer => {
    // checks if answer has already been given, does the things
    console.log("handleSubmit >> ", answer);
    if (answerGiven === "") {
      console.log("first vote!");
      //check if first time voting
      sendAnswer(answer, 1);
      setAnswerGiven(answer);
    } else if (answerGiven === answer) {
      // check if you've pressed the same button twice (undo)
      sendAnswer(answer, -1);
      setAnswerGiven("");
    } else {
      // opposite button pressed
      sendAnswer(answerGiven, -1);
      sendAnswer(answer, 1);
      setAnswerGiven(answer);
    }
  };

  const handleTextChange = ({ target: { value } }) => {
    setTextInput(value);
  };
  const handleTextSubmit = event => {
    event.preventDefault();
    setAnswerGiven(textInput);
    console.log("sending...", textInput);
    socket.emit("text given", { textInput, index });
  };

  const sendAnswer = (answer, vote) => {
    // send +1 of answer *and* store given answer in state
    // emit('given answer')
    // listen 'given' => +1 whatever the string is
    socket.emit("answer given", { answer, index, vote });
  };

  if (type === "simple") {
    console.log("is simeple!");
    return CardTemplate(
      <>
        <button
          className={`audience-yes-btn ${
            answerGiven === "yes" ? " yes-selected" : null
          }`}
          onClick={() => handleSubmit("yes")}
        >
          yes
        </button>

        <button
          className={`audience-no-btn ${
            answerGiven === "no" ? " no-selected" : null
          }`}
          onClick={() => handleSubmit("no")}
        >
          no
        </button>
      </>
    );
  }

  if (type === "text") {
    console.log("is text!");

    return CardTemplate(
      <>
        <form onSubmit={handleTextSubmit}>
          <label htmlFor="audience-text-box" className="audience-instruction">
            Input your answer:
          </label>
          {answerGiven === "" ? (
            <>
              <input
                id="audience-text-box"
                value={textInput}
                onChange={handleTextChange}
              ></input>
              <button className="audience-submit-btn">submit</button>
            </>
          ) : (
            <p>Thanks for your answer!</p>
          )}
        </form>
      </>
    );
  }

  if (type === "multi") {
    console.log("is multi!");

    return CardTemplate(
      <>
        {Object.keys(answers).map(answer => {
          return (
            <button
              className={`audience-multi-btn ${
                answerGiven === answer ? "multi-selected" : null
              }`}
              onClick={() => handleSubmit(answer)}
            >
              {answer}
            </button>
          );
        })}
      </>
    );
  }
};

export default AudienceQuestionCard;
