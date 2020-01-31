import React, { Component } from "react";
import { getSessions } from "../api";
import SessionCard from "./SessionCard";
import "./ViewSessions.css";

class ViewSessions extends Component {
  state = {
    sessions: [],
    isLoading: true,
    err: null
  };

  render() {
    const { sessions } = this.state;
    const { signedInUser } = this.props;
    return (
      <div id="view-sessions-container">
        <p className="component-identifier">ViewSessions component</p>

        <h2>{signedInUser} Sessions</h2>
        <ul>
          {sessions.map((session, index) => {
            return <SessionCard key={session.session_name} session={session} />;
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.signedInUser) this.fetchSessions();
  }

  fetchSessions = () => {
    const { signedInUser } = this.props;

    getSessions(signedInUser).then(sessions =>
      this.setState({ sessions, isLoading: false })
    );
  };
}

export default ViewSessions;
