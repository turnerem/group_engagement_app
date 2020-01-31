import React, { Component } from "react";
import { postNewSession } from "../api";

class CreateSession extends Component {
  state = {
    sessionName: "",
    questions: {},
    questionTitle: ""
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Session Name
            <input
              onChange={e => {
                this.handleChange(e.target.value, "sessionName");
              }}
            />
          </label>
          <label>
            Question Title
            <input
              onChange={e => {
                this.handleChange(e.target.value, "questionTitle");
              }}
            />
          </label>
          <select name="" id="">
            <option value="">yes-no</option>
            <option value="">text</option>
          </select>
          <button>create sesh</button>
        </form>
        <h3>{this.state.sessionName}</h3>
        <ul>
          {Object.keys(this.state.questions).map(question => {
            return (
              <li>
                <p>{question}</p>
                <p>{String(this.state.questions[question])}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState(currentState => {
      return {
        questions: {
          ...currentState.questions,
          [this.state.questionTitle]: { yes: 0, no: 0 }
        }
      };
    });
  };

  handleChange = (value, key) => {
    console.log(value);
    this.setState({ [key]: value });
  };
}

export default CreateSession;
