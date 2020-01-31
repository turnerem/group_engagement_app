import React, { Component } from "react";
import { getSessions } from "../api";

class ViewSessions extends Component {
  state = {
    sessions: [],
    isLoading: true,
    err: null
  };

  render() {
    const {sessions} = this.state
    console.log(sessions)
    return <div>


    </div>;
  }

  componentDidMount() {
    this.fetchSessions();
  }

  fetchSessions = () => {
    getSessions().then(
      data => this.setState({ sessions: data.sessions, isLoading: false })
    );
  };
}

export default ViewSessions;
