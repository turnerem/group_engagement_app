import React, { Component } from "react";
import { postNewSession } from "../api";
import "./CreateSession.css";

class CreateSession extends Component {
  state = {
    // goal: {
    //   session_name: 'abcdefg',
    //   question: [
    //     {
    //       "do birds exist?": {"yes": 0, "no":0},
    //       "how big is the world": {"answers": []},
    //       "which one isn't a powerranger": {"blue one": 0, "red one": 0, "gold one" : 0 , "donatello": 0}
    //     }
    //   ]
    // }

    sessionNameInput: "",
    questionTitleInput: "",
    savedQuestions: [{question: 'ereoif', answers:["yes', 'no"], type: 'multi'} ],
    type: "simple",
    multiQuestionInput: [...Array(6)]
  };

  render() {
    console.log(this.state);
    const { sessionNameInput, questionTitleInput, savedQuestions, type, multiQuestionInput } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Session Name:
            <input
              onChange={e => {
                this.handleChange(e.target.value, "sessionNameInput");
              }}
              value={sessionNameInput}
            />
          </label>
          <label>
            _question title:
            <input
              onChange={e => {
                this.handleChange(e.target.value, "questionTitleInput");
              }}
              value={questionTitleInput}
              required
            />
          </label>
          <select onChange={this.selectType}>
            <option id="object_type" value={"simple"}>
              yes-no
            </option>
            <option id="multiple_choice" value={"multi"}>
              multiple choice
            </option>
            <option id="string_type" value={"text"}>
              text
            </option>
          </select>
          {console.log('the type', type)}
          {(type === 'multi') &&
          //  const arr = new Array(6)
          multiQuestionInput.map((elem, i) => {
             return <p>{i}</p>
            // return <input type='text' onChange={(e, i) => {this.handleMulti(e, i)}}/>
          })
          }
          <button>add a question</button>
        </form>
        <h3>{this.state.session_name}</h3>
        <ul>
          {savedQuestions.map((question, index) => {
            // console.log(question, "<<<<<<<<");
            return (
              <li key={index}>
                <p>{Object.keys(question)[0]}</p>
                {/* <p>{Object.keys(Object.values(question)[0])}</p> */}
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
    const { type, questionTitleInput } = this.state;
    // let qType;
    // if (type === 0) {
    //   qType = object_type;
    // } else {
    //   qType = string_type;
    // }
    if (type === "text") {
      this.setState(currentState => {
        return {
          savedQuestions: [
            ...currentState.savedQuestions,
            { [questionTitleInput]: { answers: [] } }
          ],
          questionTitleInput: ""
        };
      });
      // formattedQuestion = {
      //   [questionTitleInput]: { answers: [] }
      // };
    }
    if (type === "simple") {
      this.setState(currentState => {
        return {
          savedQuestions: [
            ...currentState.savedQuestions,
            { [questionTitleInput]: { yes: 0, no: 0 } }
          ],
          questionTitleInput: ""
        };
      });
    }
  };

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  handleMulti = (event, i) => {
    const { value } = event.target;
    this.setState((currentState) => {
      const { multiQuestionInput } = currentState
      const updatedMulti = [...multiQuestionInput]
      updatedMulti[i] = value
      return { multiQuestionInput: updatedMulti}
    })
  }

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
    console.log('setting type');
    const { value } = event.target;
    this.setState({ type: value });
  };
}

export default CreateSession;
