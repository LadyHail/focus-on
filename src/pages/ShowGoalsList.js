import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoalDetail from './GoalDetail.js';

//TODO add timeleft
//TODO details
class ShowGoalsList extends Component {

    state = {
        goals: []
    }

    componentWillMount = () => {
        this.getAll();
    }

    getAll = () => {
        const keys = Object.keys(window.localStorage);
        let goals = [];
        let goal = {};
        keys.forEach(function (key) {
            goal = window.localStorage.getItem(key);
            goals.push(JSON.parse(goal));
        });
        this.setState({ goals });
    }

    render = () => {
        return (
            <div>
                {this.state.goals.map(item =>
                    <div key={item.id} data-id={item.id}>
                        <Link to={`/goal/${item.id}/`} className="goal-link">
                            <p>{item.description}</p>
                            <p>{item.created}</p>
                            <p>{item.expDate}</p>
                            <p>{item.tasks.length}</p>
                            <hr />
                        </Link>
                    </div>
                )
                }
            </div>
            )
    }
}

export default ShowGoalsList;