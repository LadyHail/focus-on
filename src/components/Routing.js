import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NewGoal from '../pages/NewGoal.js';
import ShowGoalsList from '../pages/ShowGoalsList.js';
import GoalDetail from '../pages/GoalDetail';

class Routing extends Component {
    render = () => {
        return (
            <div>
                <Route exact path="/" />
                <Route path="/goal/new" component={NewGoal} />
                <Route path="/goals" component={ShowGoalsList} />
                <Route strict path="/goal/:id/" component={GoalDetail} />
            </div>
        );
    }
}

export default Routing;