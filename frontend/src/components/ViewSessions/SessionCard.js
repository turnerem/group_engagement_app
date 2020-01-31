import React from "react";

const SessionCard = props => {
  const { session } = props;
  return (
    <div>
      <li>
        <p>{session.session_name}</p>
        <p>Questions {Object.keys(session.questions).length}</p>
      </li>
    </div>
  );
};

export default SessionCard;
