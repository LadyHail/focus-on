import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './app.css';
import NewGoal from '../pages/NewGoal.js';
import ShowGoalsList from '../pages/ShowGoalsList.js';
import GoalDetail from '../pages/GoalDetail';

class App extends Component {
  render() {
    return (
        <main>
            <ul>
                <li><Link to="/goal/new">Set new goal</Link></li>
                <li><Link to="/goals">Goals</Link></li>           
            </ul>

            <Route path="/goal/new" component={NewGoal} />
            <Route path="/goals" component={ShowGoalsList} />
            <Route strict path="/goal/:id/" component={GoalDetail} />
        </main>
    );
  }
}

export default App;
