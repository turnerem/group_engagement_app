import React from "react";
import { Link } from "@reach/router";
import './PreparedSessionCard.css'

const PreparedSessionCard = props => {
  const { session } = props;
  return (
    <div className='session-card'>
     
      <div className='session-card-info'>
        <li>
          <Link to={`${session.session_name}`}>
            <p className='session-name'>{session.session_name}</p>
          </Link>
          <p className='session-question-count'>{Object.keys(session.questions).length} questions</p>
        </li>
      </div>

      <div className='session-card-btns'>
        <button className='start-session-btn'>Start Session</button>
        <button className='edit-session-btn'>Edit Session</button>
      </div>

    </div>
  );
};

export default PreparedSessionCard;
