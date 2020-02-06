import React, { Component } from "react";
import { postNewSession } from "../api";
import "./CreateSession.css";
import SavedQuestion from "./SavedQuestion";
import { Link, navigate } from "@reach/router";

class CreateSession extends Component {
  state = {
    session_name: "",
    question: "",
    questions: [],
    type: "simple",
    multiQuestionInput: [...Array(6)]
  };

  render() {
    console.log(this.state);
    const {
      session_name,
      question,
      questions,
      type,
      multiQuestionInput
    } = this.state;
    
    return (
      <div id="create-session-container">
        <Link to="/sessions">Back to dashboard</Link>
        <h3>Create a new session</h3>
        <label htmlFor="session-name-input">Session Name:</label>
        <input
          onChange={e => {
            this.handleChange(e.target.value, "session_name");
          }}
          value={session_name}
          id="session-name-input"
          placeholder="required...."
        />

        <h4>Questions</h4>
        <form onSubmit={this.handleSubmit} className="create-session-form">
          <p>Question {questions.length + 1}</p>
          <div className="saved-question-header">
            <label htmlFor="question-title-input">_question title:</label>
            <select onChange={this.selectType} value={this.state.type}>
              <option id="object_type" value={"simple"}>
                yes-no
              </option>
              <option id="string_type" value={"text"}>
                text
              </option>
              <option id="multiple_choice" value={"multi"}>
                multiple choice
              </option>
            </select>
          </div>
          <input
            onChange={e => {
              this.handleChange(e.target.value, "question");
            }}
            value={question}
            id="question-title-input"
            required
          />

          {type === "multi" &&
            multiQuestionInput.map((elem, i) => {
              multiQuestionInput.filter(elem => elem !== undefined);
              const filtered = multiQuestionInput.filter(
                elem => elem !== undefined
              );

              return (
                <input
                  key={i}
                  type="text"
                  onChange={e => {
                    this.handleMulti(e, i);
                  }}
                  className="multi-choice-field"
                  placeholder="optional"
                  required={filtered.length <= 1}
                />
              );
            })}
          <button className="add-question-btn">add a question</button>
        </form>
        <h3>{this.state.session_name}</h3>
        <ul>
          {questions.map((questionTitle, index) => {
            return (
              <SavedQuestion
                questionTitle={questionTitle}
                index={index}
                key={index}
              />
            );
          })}
        </ul>
        <button
          onClick={this.handleCreateSession}
          className="create-session-btn"
          disabled={session_name.length < 1}
        >
          create sesh
        </button>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { type, question } = this.state;

    if (type === "text") {
      this.setState(currentState => {
        return {
          questions: [
            ...currentState.questions,
            { question: question, answers: [], type: type }
          ],
          question: ""
        };
      });
    }

    if (type === "simple") {
      this.setState(currentState => {
        return {
          question: "",
          questions: [
            ...currentState.questions,
            { question: question, answers: { yes: 0, no: 0 }, type: type }
          ]
        };
      });
    }

    if (type === "multi") {
      const filteredOptions = this.state.multiQuestionInput.filter(item => {
        return item !== undefined;
      });
      const formattedObj = this.formatMulti(filteredOptions);
      this.setState(currentState => {
        return {
          questions: [
            ...currentState.questions,
            { question: question, answers: formattedObj, type: type }
          ],
          question: "",
          multiQuestionInput: [...Array(6)],
          type: "simple"
        };
      });
    }
  };

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  handleMulti = (event, i) => {
    const { value } = event.target;
    this.setState(currentState => {
      const { multiQuestionInput } = currentState;
      const updatedMulti = [...multiQuestionInput];
      updatedMulti[i] = value;
      return { multiQuestionInput: updatedMulti };
    });
  };

  formatMulti = arr => {
    const newObj = arr.reduce((result, item) => {
      result[item] = 0;
      return result;
    }, {});
    return newObj;
  };

  handleCreateSession = () => {
    const { session_name, questions } = this.state;
    const { signedInUser } = this.props;
    postNewSession(signedInUser, session_name, questions).then(
      this.setState({
        session_name: "",
        questions: []
      })
    );
    navigate("/sessions");
  };

  selectType = event => {
    const { value } = event.target;
    this.setState({ type: value });
  };
}

export default CreateSession;
