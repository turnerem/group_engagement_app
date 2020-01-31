import React, { Component } from "react";
import { getSessions } from "../api";
import SessionCard from "./SessionCard";

class ViewSessions extends Component {
  state = {
    sessions: [],
    isLoading: true,
    err: null
  };

  render() {
    const { sessions } = this.state;
    console.log(sessions);
    return (
      <div>
        <h2>Your Sessions</h2>
        <ul>
          {sessions.map((session, index) => {
            return <SessionCard key={index} session={session} />;
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    this.fetchSessions();
  }

  fetchSessions = () => {
    getSessions().then(sessions =>
      this.setState({ sessions, isLoading: false })
    );
  };
}

export default ViewSessions;
