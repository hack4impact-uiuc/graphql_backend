import * as React from 'react';
import styled from 'styled-components';
import LessonComponent from './../components/lesson';

class LessonForm extends React.Component {
    constructor() {
        super();
        this.state = {
            Lessons: [],
            name: '',
            notes: '',
            wksht: '',
            quiz: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = event.target;
        this.setState({
            Lesson: this.state.Lessons.push({
                name: this.state.name,
                notes: this.state.notes,
                worksheet: this.state.wksht,
                quiz: this.state.quiz,
            }),
        });

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="Lesson Name">Lesson Name: </label>
                        <input id="Lesson Name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="Lesson Notes">Lesson Notes: </label>
                        <input id="Lesson Notes" name="notes" type="text" value={this.state.notes} onChange={this.handleChange} />
                    </div>
                    
                    <div>
                        <label htmlFor="Lesson Wksht">Lesson Worksheet: </label>
                        <input id="Lesson Wksht" name="wksht" type="text" value={this.state.wksht} onChange={this.handleChange} />
                    </div>
                    
                    <div>
                        <label htmlFor="Lesson Wksht">Lesson Quiz: </label>
                        <input id="Lesson Wksht" name="quiz" type="text" value={this.state.quiz} onChange={this.handleChange} />
                    </div>
                    <div>
                        <button>Add Lesson</button>
                    </div>
                </form>

                <div>
                    <div>
                        {
                            this.state.Lessons.map(lesson => (
                                <LessonComponent lessonName={lesson.name} lessonNotes={lesson.notes} worksheetName={lesson.worksheet} quizName={lesson.quiz} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default LessonForm;
