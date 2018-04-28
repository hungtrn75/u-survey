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
            question = <p>Hey</p>;
        }
        return (
            <div className="namy">
                {studentName}
                <hr />
                {question}
            </div>
        );
    }

    nameSubmit = e => {
        e.preventDefault();
        let studentName = this.refs.name.value;
        this.setState({ studentName }, () => console.log(this.state));
    }
}

export default Usurvey;