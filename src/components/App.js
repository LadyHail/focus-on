import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './app.css';
import NewGoal from '../pages/NewGoal.js';
import ShowGoalsList from '../pages/ShowGoalsList.js';
import GoalDetail from '../pages/GoalDetail.js';
import EditGoal from '../pages/EditGoal.js';
import EditTask from '../pages/EditTask.js';
import NewTask from '../pages/goalDetail/NewTask.js';

class App extends Component {

    render() {
        return (
            <main>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/goal/new">Set new goal</Link></li>
                    <li><Link to="/goals">Goals</Link></li>
                </ul>                
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
    );
  }
}

export default App;
