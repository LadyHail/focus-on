import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NewGoal from '../pages/NewGoal.js';
import ShowGoalsList from '../pages/ShowGoalsList.js';
import GoalDetail from '../pages/GoalDetail.js';
import EditGoal from '../pages/goalDetail/EditGoal.js';
import EditTask from '../pages/goalDetail/EditTask.js';
import NewTask from '../pages/goalDetail/NewTask.js';
import Nav from './Nav.js';
import NotFound from './NotFound.js';

class App extends Component {

    render() {
        return (
            <div>
                <Nav /> 
                <main>
                    <div>
                        <Switch>
                            <Route exact path="/" />
                            <Route path="/goal/new" component={NewGoal} />
                            <Route path="/goals" component={ShowGoalsList} />
                            <Route exact strict path="/goal/:id/" component={GoalDetail} />
                            <Route exact strict path="/goal/edit/:id" component={EditGoal} />
                            <Route exact strict path="/goal/edit/:goalId/:taskId/" component={EditTask} />
                            <Route exact strict path="/goal/add/:id" component={NewTask} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </main>
            </div>
    );
  }
}

export default App;
