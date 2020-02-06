import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import "./PreparedSessionCard.css";

const PreparedSessionCard = props => {
  const {
    session: { session_name, questions }
  } = props;

  const [sessionCode, setSessionCode] = useState("");

  const handleChange = ({ target: { value } }) => {
    setSessionCode(value);
  };

  const handleSessionStart = () => {
    if (sessionCode) {
      navigate(`/sessions/${sessionCode}`);
    }
  };
  console.log("session name******* ", session_name);
  return (
    <div className="session-card">
      <div className="session-card-info">
        <li>
          <Link to={session_name}>
            <p className="session-name">{session_name}</p>
          </Link>
          <p className="session-question-count">
            {Object.keys(questions).length} questions
          </p>
        </li>
      </div>

      <div className="session-card-btns">
        <Link to={session_name}>
          <button className="start-session-btn">Start Session</button>
        </Link>
        <input type="input" onChange={handleChange} />
        <button onClick={handleSessionStart}>Set and go!</button>
        <button className="edit-session-btn">Edit Session</button>
      </div>
    </div>
  );
};

export default PreparedSessionCard;
