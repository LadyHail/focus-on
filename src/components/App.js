import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './app.css';
import NewGoal from '../pages/NewGoal.js';
import ShowGoalsList from '../pages/ShowGoalsList.js';
import GoalDetail from '../pages/GoalDetail.js';
import EditGoal from '../pages/goalDetail/EditGoal.js';
import EditTask from '../pages/goalDetail/EditTask.js';
import NewTask from '../pages/goalDetail/NewTask.js';
import Nav from './Nav.js';

class App extends Component {

    render() {
        return (
            <div>
                <Nav /> 
                <main>
                    <div>
                        <Route path="/" />
                        <Route path="/goal/new" component={NewGoal} />
                        <Route path="/goals" component={ShowGoalsList} />
                        <Route exact strict path="/goal/:id/" component={GoalDetail} />
                        <Route exact strict path="/goal/edit/:id" component={EditGoal} />
                        <Route exact strict path="/goal/edit/:goalId/:taskId/" component={EditTask} />
                        <Route exact strict path="/goal/add/:id" component={NewTask} />
                    </div>
                </main>
            </div>
    );
  }
}

export default App;
