import React, { useState, useEffect } from "react";
import "./SessionView.css";
import * as api from "../api";

const SessionView = props => {
  const { session_name, signedInUser } = props;
  console.log(`Viewing ${signedInUser}s ${session_name} session....`);
  const [sessionData, setSessionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    api.getSingleSession(signedInUser, session_name).then(data => {
      setSessionData(data);
      setIsLoading(false);
    });
  }, []);
  console.log(">>>>", sessionData);
  if (isLoading) return <p>Loading....</p>;

  return (
    <div id="session-view-container">
      <p className="component-identifier">SessionView component</p>
      <h3>{session_name}</h3>
      <ul>
        {sessionData.questions &&
          Object.keys(sessionData.questions).map(question => {
            return (
              <li>
                <p>{question}</p>
                <ul>
                  <li></li>
                </ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SessionView;
