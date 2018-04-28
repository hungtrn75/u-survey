import React, { Component } from 'react';
import firebase from 'firebase';
import uuid from 'uuid';

var config = {
    apiKey: "AIzaSyCdeiQHkEsBDDxMQh9rFarKPz3dBUsHFPE",
    authDomain: "u-survey-a4512.firebaseapp.com",
    databaseURL: "https://u-survey-a4512.firebaseio.com",
    projectId: "u-survey-a4512",
    storageBucket: "u-survey-a4512.appspot.com",
    messagingSenderId: "130535044921"
};
firebase.initializeApp(config);

class Usurvey extends Component {

    nameSubmit = e => {
        e.preventDefault();
        let studentName = this.refs.name.value;
        this.setState({ studentName }, () => console.log(this.state));
    }

    answerChange = e => {
        let { answer } = this.state;
        let target = e.target;
        let name = target.name;
        if (name === 'answer1') {
            answer.answer1 = target.value;
        } else if (name === 'answer2') {
            answer.answer2 = target.value;
        } else {
            answer.answer3 = target.value;
        }
        this.setState({
            answer
        });
    }

    questionSubmit = (e) => {
        e.preventDefault();
        let { studentName, answer } = this.state;
        firebase.database().ref('u-survey/' + this.state.uuid).set({
            studentName,
            answer
        })
        this.setState({
            isSubmitted: true
        });
        console.log(this.state);
    }

    constructor(props) {
        super(props);
        this.state = {
            uuid: uuid.v1(),
            studentName: '',
            answer: {
                answer1: '',
                answer2: '',
                answer3: '',
            },
            isSubmitted: false
        };
    }

    render() {
        let { studentName, isSubmitted } = this.state;
        let question;
        if (studentName === '' && isSubmitted === false) {
            studentName = <div>
                <h1>Hey student, please let us know ur name:</h1>
                <form onSubmit={this.nameSubmit}>
                    <input className="namy" type="text" placeholder="Your name" ref="name" />
                </form>
            </div>;
        } else if (isSubmitted === false) {
            studentName = <div>
                <h1>Welcome to u-survy, {studentName}</h1>
            </div>;
            question = <div>
                <h2>Here are some question:</h2>
                <form  onSubmit={this.questionSubmit}>
                    <div className="card">
                        <lable>What kind of courses you like the most:</lable><br />
                        <input type="radio" name="answer1" value="Technology" onChange={this.answerChange} />Technology
                        <input type="radio" name="answer1" value="Design" onChange={this.answerChange} />Design
                        <input type="radio" name="answer1" value="Marketing" onChange={this.answerChange} />Marketing
                    </div>
                    <div className="card">
                        <lable>You are a: </lable><br />
                        <input type="radio" name="answer2" value="Student" onChange={this.answerChange} />Student
                        <input type="radio" name="answer2" value="On-job" onChange={this.answerChange} />On-job
                        <input type="radio" name="answer2" value="Looking-job" onChange={this.answerChange} />Looking-job
                    </div>
                    <div className="card">
                        <lable>Is this course learning helpful: </lable><br />
                        <input type="radio" name="answer3" value="Yes" onChange={this.answerChange} />Yes
                        <input type="radio" name="answer3" value="No" onChange={this.answerChange} />No
                        <input type="radio" name="answer3" value="Maybe" onChange={this.answerChange} />Maybe
                    </div>
                    <button type="submit" value="submit"  className="feedback-button">Submit</button>
                </form>
            </div>;
        } else if (isSubmitted) {
            studentName = <p>Thanks, {studentName}</p>;
        }
        return (
            <div className="namy">
                {studentName}
                <p>--------------------------------</p>
                {question}
            </div>
        );
    }
}

export default Usurvey;