import React from "react";
import { Link } from "@reach/router";

const SessionCard = props => {
  const { session } = props;
  return (
    <div>
      <li>
        <Link to={`${session.session_name}`}>
          <p>{session.session_name}</p>
        </Link>
        <p>Questions {Object.keys(session.questions).length}</p>
      </li>
    </div>
  );
};

export default SessionCard;
