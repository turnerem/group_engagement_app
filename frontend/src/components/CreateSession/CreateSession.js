import React, { Component } from "react";
import { postNewSession } from "../api";
import "./CreateSession.css";
import SavedQuestion from "./SavedQuestion";
import {Link} from '@reach/router'

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
    savedQuestions: [],
    // savedQuestions: [{question: 'ereoif', answers:["yes', 'no"], type: 'multi'} ],
    type: "simple",
    multiQuestionInput: [...Array(6)]
  };

  render() {
    console.log(this.state)
    const { sessionNameInput, questionTitleInput, savedQuestions, type, multiQuestionInput } = this.state;
    return (
      <div id='create-session-container'>
        <Link to='/sessions'>Back to dashboard</Link>
        <h3>Create a new session</h3>
          <label htmlFor='session-name-input'>
            Session Name:</label>
            <input
              onChange={e => {
                this.handleChange(e.target.value, "sessionNameInput");
              }}
              value={sessionNameInput}
              id='session-name-input'
            />
          
          <h4>Questions</h4>
        <form onSubmit={this.handleSubmit} className='create-session-form'>
            <p>Question {savedQuestions.length + 1}</p>
          <div class="saved-question-header">
            <label htmlFor='question-title-input'>
              _question title:</label>
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
                this.handleChange(e.target.value, "questionTitleInput");
              }}
              value={questionTitleInput}
              id='question-title-input'
              required
            />
          
          {(type === 'multi') &&
          multiQuestionInput.map((elem, i) => {
            return <input key={i} type='text' onChange={(e) => {this.handleMulti(e, i)}} className='multi-choice-field' placeholder='optional'/>
          })
          }
          <button className='add-question-btn'>add a question</button>
        </form>
        <h3>{this.state.session_name}</h3>
        <ul>
          {savedQuestions.map((question, index) => {
            // console.log(question, "<<<<<<<<");
            return (
           <SavedQuestion question={question} index={index} key={index}/>
            );
          })}
        </ul>
        <button onClick={this.handleCreateSession} className='create-session-btn'>create sesh</button>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { type, questionTitleInput } = this.state;
  
    if (type === "text") {
      this.setState(currentState => {
        return {
          savedQuestions: [
            ...currentState.savedQuestions,
            { [questionTitleInput]: { answers: [] }, type: type }
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
            { [questionTitleInput]: { yes: 0, no: 0 }, type: type }
          ],
          questionTitleInput: ""
        };
      });
    }
    if (type === "multi") {
      this.setState(currentState => {
        return {
          savedQuestions: [
            ...currentState.savedQuestions,
            { [questionTitleInput]: this.state.multiQuestionInput, type: type}
          ],
          questionTitleInput: "",
          multiQuestionInput: [...Array(6)],
          type: "simple"
        }
      }
      )}
  };

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  handleMulti = (event, i) => {
    const { value } = event.target;
    // console.log(value);
    this.setState((currentState) => {
      const { multiQuestionInput } = currentState
      const updatedMulti = [...multiQuestionInput]
      updatedMulti[i] = value;
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
