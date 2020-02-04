import React, { Component } from "react";
import { postNewSession } from "../api";
import "./CreateSession.css";

class CreateSession extends Component {
  state = {
    session_name: "",
    questions: {},
    questionTitle: "",
    object_type: { no: 0, yes: 0 },
    string_type: "",
    type: 0,
    input_session_name: "",
    input_questionTitle: ""
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Session Name:
            <input
              onChange={e => {
                this.handleChange(e.target.value, "session_name");
              }}
            />
          </label>
          <label>
            _ask a question:
            <input
              onChange={e => {
                this.handleChange(e.target.value, "questionTitle");
              }}
              required
            />
          </label>
          <select onChange={this.selectType}>
            <option id="object_type" value={this.state.object_type}>
              yes-no
            </option>
            <option id="string_type" value={this.state.string_type}>
              text
            </option>
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
    const { object_type, string_type, type } = this.state;
    let qType;
    if (type === 0) {
      qType = object_type;
    } else {
      qType = string_type;
    }
    this.setState(currentState => {
      return {
        questions: {
          ...currentState.questions,
          [this.state.questionTitle]: qType
        }
      };
    });
    // this.setState({ questionTitle: "" });
  };

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  // handleChange = (value, key) => {
  //   const { input_session_name, input_questionTitle, input_type  } = this.state;
  //   if (key === input_session_name) {
  //   this.setState({ session_name: value, input_session_name: "" });
  //   }
  //   if (key === input_questionTitle) {
  //     this.setState({ questionTitle: value, input_questionTitle: ""})
  //   }
  //   if (key === input_type) {
  //     this.setState({type: value, input_type: })
  //   }
  // };

  handleCreateSession = () => {
    const { session_name, questions } = this.state;
    const { signedInUser } = this.props;
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
    if (value === "") {
      this.setState({ type: 1 });
    } else if (value !== "") {
      this.setState({ type: 0 });
    }
  };
}

export default CreateSession;
