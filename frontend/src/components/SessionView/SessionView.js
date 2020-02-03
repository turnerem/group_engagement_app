import React, { useState, useEffect } from "react";
import "./SessionView.css";
import * as api from "../api";
import PromptQuestionCard from "./PromptQuestionCard";

const SessionView = props => {
  const { sessionCode, signedInUser } = props;
  // console.log(`Viewing ${signedInUser}s ${sessionCode} session....`);
  const [sessionData, setSessionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(props, "<<<<<<<<");
  useEffect(() => {
    // aka componentDidMount
    api.getSingleSession("JessJelly", "Painting").then(data => {
      setSessionData(data);
      setIsLoading(false);
    });
  }, []);
  // console.log(">>>>", sessionCode);
  if (isLoading) return <p>Loading....</p>;

  return (
    <div id="session-view-container">
      {/* <p className="component-identifier">SessionView component</p> */}
      <div id="session-view-header">
        <h3>{sessionCode}</h3>
        <p>Abort Session</p>
      </div>
      <p>Connected users: _______</p>
      <div id="live-data-view">live-data-view</div>
      <ul>
        {sessionData.questions &&
          Object.keys(sessionData.questions).map(question => {
            return (
              <PromptQuestionCard
                question={question}
                answers={sessionData.questions[question]}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default SessionView;
