import React, { Component } from "react";
import { getSessions } from "../api";
import PreparedSessionCard from "./PreparedSessionCard";
import {Link} from '@reach/router'
import "./ViewSessions.css";
import * as data from '../../exampleData.json'

class ViewSessions extends Component {
  state = {
    sessions: [...data.default.sessions],
    isLoading: true,
    err: null
  };

  render() {
    console.log(data.default.sessions);
    const { sessions } = this.state;
    const { signedInUser } = this.props;
    return (
      <>
      <div id="view-prepared-container">
        {/* <p className="component-identifier">ViewSessions component</p> */}
        
<div id='view-prepared-header'>
        <h2>Welcome {signedInUser}</h2>
        <Link to='/' id="create-account-link">
        <p>Logout</p>
        </Link>
</div>

 <Link to='/create-session' >
   <button id='create-session-btn'>Create a new session</button>
   <p>Prepared sessions</p>
 </Link>
        <ul id='prepared-session-list'>
          {sessions.map((session, index) => {
            return <PreparedSessionCard key={session.session_name} session={session} />;
          })}
        </ul>
      </div>
      <div id='view-previous-container'>
          <p>Previous Sessions</p>
      </div>
      </>
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
