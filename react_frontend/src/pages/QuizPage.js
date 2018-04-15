/* 
 * This page is shown when an Admin edits a Quiz for a lesson
 * It accepts a prop through react router with the lessonID
 */
import React, { Component } from 'react';
import Question from '../components/question';
import { graphql, QueryRenderer } from 'react-relay';
import environment from '../relay/environment';
import PaddedButton from '../components/button';
import AdminQuiz from '../components/adminQuiz';

class QuizPage extends Component{

    constructor(props){
        super(props);
        this.state = {qNum : 0, qMap : [], editable : 0};
    }
    
    finish = () => {this.props.history.push('/admin')}
    addQuestion = () => {
        this.setState({
            qNum : this.state.qNum + 1,
            qMap : [...this.state.qMap, this.state.qNum + 1],
        });
    }

    // lock all questions
    lock = () => {
        this.setState({editable : 0});
    }

    // toggles a question "editable", passUp is the index of the question
    passBack = passUp => {
        this.setState({editable : passUp, passed : true});
    }

    render() {
        if (!this.props.location || !this.props.location.state || !this.props.location.state.lessonID){
            return <h2>Lesson doesn't exist. Try again.</h2>
        }
        return (
            <QueryRenderer
                    environment={environment}
                    query={graphql`
                        query QuizPage_Query($lesson_id: ID!){
                            node(id: $lesson_id) {
                                id
                                ... on Lesson {
                                    name
                                    quiz {
                                        questions {
                                            id
                                            questionName
                                            answers{
                                                answerName
                                                isCorrect
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    `}
                    variables={{
                        lesson_id: this.props.location.state.lessonID
                    }}
                    render={({ props }) => {
                        if (!props || !props.node) {
                            return (
                                <div>Loading...</div>
                            );
                        }
                        return (
                            <div>
                                <h1>Quiz Page</h1>
                                <AdminQuiz questions={props.node.quiz.questions}/>
                            </div>
                        );
                    }}
            />
        );
    }
}

export default QuizPage;
