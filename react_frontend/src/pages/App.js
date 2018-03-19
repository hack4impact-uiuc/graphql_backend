// @flow

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StudentPage from './StudentPage';
import TeacherPage from './TeacherPage';
import AdminPage from './AdminPage';  
import HomePage from './HomePage';
import QuizPage from './QuizPage';
import TakeQuizPage from './TakeQuizPage';

type Props = {
    /**/ 
}

class App extends React.Component<Props>{ 
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/" >Home</Link>
                            </li>
                            <li>
                                <Link to="/student" >Student</Link>
                            </li>
                            <li>
                                <Link to="/teacher" >Teacher</Link>
                            </li>
                            <li>
                                <Link to="/admin" >Admin</Link>
                            </li>
                        </ul>

                        <hr />
                        <Route exact path="/" component={ HomePage } /> 
                        <Route path="/student" component={StudentPage} studentName="Shreyas"/>
                        <Route path="/teacher" component={TeacherPage} />
                        <Route path="/admin" component={AdminPage} />
                        <Route path="/quiz" component={QuizPage} />
                        <Route path="/takequiz" component={TakeQuizPage}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;