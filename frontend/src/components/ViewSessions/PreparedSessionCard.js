import React from "react";
import { Link } from "@reach/router";
import "./PreparedSessionCard.css";

const PreparedSessionCard = props => {
  const {
    session: { session_name, questions }
  } = props;
  console.log("sessioncard props", props);
  return (
    <div className="session-card">
      <div className="session-card-info">
        <li>
          <Link to={`${session_name}`}>
            <p className="session-name">{session_name}</p>
          </Link>
          <p className="session-question-count">
            {Object.keys(questions).length} questions
          </p>
        </li>
      </div>

      <div className="session-card-btns">
        <Link to={`${session_name}`}>
          <button className="start-session-btn">Start Session</button>
        </Link>
        <button className="edit-session-btn">Edit Session</button>
      </div>
    </div>
  );
};

export default PreparedSessionCard;
