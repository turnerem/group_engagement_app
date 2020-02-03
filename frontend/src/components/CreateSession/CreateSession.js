import React, { Component } from "react";
import { postNewSession } from "../api";
import "./CreateSession.css";

class CreateSession extends Component {
  state = {
    session_name: "",
    questions: {},
    questionTitle: "",
    type: { no: 0, yes: 0 }
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Session Name
            <input
              onChange={e => {
                this.handleChange(e.target.value, "session_name");
              }}
            />
          </label>
          <label>
            Question Title
            <input
              onChange={e => {
                this.handleChange(e.target.value, "questionTitle");
              }}
              required
            />
          </label>
          <select onChange={this.selectType}>
            <option value={{ no: 0, yes: 0 }}>yes-no</option>
            <option value="">text</option>
          </select>
          <button>add a question</button>
        </form>
        <h3>{this.state.session_name}</h3>
        <ul>
          {Object.keys(this.state.questions).map((question, index) => {
            return (
              <li key={index}>
                <p>{question}</p>
                <p>{JSON.stringify(this.state.questions[question])}</p>
              </li>
            );
          })}
        </ul>
        <button onClick={this.handleCreateSession}>create sesh</button>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { type } = this.state;
    this.setState(currentState => {
      return {
        questions: {
          ...currentState.questions,
          [this.state.questionTitle]: type
        }
      };
    });
  };

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  handleCreateSession = () => {
    const { session_name, questions } = this.state;
    postNewSession("JessJelly", session_name, questions).then(
      this.setState({
        session_name: "",
        questions: {},
        questionTitle: ""
      })
    );
  };

  selectType = event => {
    const { value } = event.target;
    this.setState({ type: value });
  };
}

export default CreateSession;
