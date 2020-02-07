import React, { Component } from "react";
import { getSessions } from "../api";
import PreparedSessionCard from "./PreparedSessionCard";
import { Link } from "@reach/router";
import "./ViewSessions.css";
import WaitingForQuestion from "../Audience/WaitingForQuestion";
// import * as data from "../../exampleData.json";
import PreviousSessionCard from "./PreviousSessionCard";

class ViewSessions extends Component {
  state = {
    sessions: [],
    isLoading: true,
    err: null,
    sessionsNotFound: false
  };

  componentDidMount() {
    if (this.props.signedInUser) {
      this.fetchSessions();
    }
  }

  render() {
    // console.log("rendering...");
    const { sessions, isLoading, sessionsNotFound } = this.state;
    const { signedInUser } = this.props;
    console.log("in ViewSessions >>>> ", sessions);

    if (isLoading) {
      return (
        <>
          <div id="view-prepared-container">
            <div id="view-prepared-header">
              <h2>Welcome {signedInUser}</h2>
              <Link to="/" id="create-account-link">
                <p>Logout</p>
              </Link>
            </div>
          </div>
          <p className="loading-profile">Loading profile</p>
          <WaitingForQuestion />
        </>
      );
    }
    return (
      <>
        <div id="view-prepared-container">
          {/* <p className="component-identifier">ViewSessions component</p> */}

          <div id="view-prepared-header">
            <h2>Welcome {signedInUser}</h2>
            <Link to="/" id="create-account-link">
              <p>Logout</p>
            </Link>
          </div>

          <Link to="/create-session">
            <button id="create-session-btn">Create a new session</button>
          </Link>
          {sessionsNotFound ? (
            <p>No saved sessions - why not create one!</p>
          ) : (
            <>
              <p className="session-list-type">Prepared sessions</p>
              <ul id="prepared-session-list">
                {sessions.map((session, index) => {
                  return (
                    <PreparedSessionCard
                      key={session.session_name}
                      session={session}
                      index={index}
                    />
                  );
                })}
              </ul>{" "}
            </>
          )}
        </div>
        {/* <div id="view-previous-container">
          <p className="session-list-type">Previous Sessions</p>
          <PreviousSessionCard
            session={{
              session_name: "Fundamentals Day 1 Review",
              questions: new Array(9),
              date_presented: new Date()
            }}
          />
        </div> */}
      </>
    );
  }

  fetchSessions = () => {
    // console.log("fething sessions...");
    const { signedInUser } = this.props;

    getSessions(signedInUser).then(sessions => {
      console.log("fetched: ", sessions);
      // doug:
      // this is to avoid crashed on no sessions found
      // TODO - add 'no sessions yet, why not create one!' message
      if (sessions.length !== 0) {
        this.setState({ sessions, isLoading: false });
      } else {
        this.setState({ sessionsNotFound: true, isLoading: false });
      }
    });
  };
}

export default ViewSessions;
