import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoalDetail from './GoalDetail.js';
import { getAll } from '../utils/DbHelper.js';
import { getLocalDate, timeLeft } from '../utils/DateTime.js';

//TODO add timeleft
class ShowGoalsList extends Component {

    componentWillMount = () => {
        this.goals = getAll();
    }

    render = () => {
        return (
            <div>
                {this.goals.map(item => {
                    return (
                        <div key={item.id} data-id={item.id}>
                            <Link to={`/goal/${item.id}/`} className="goal-link">
                                <p>{item.description}</p>
                                <p>{getLocalDate(item.created)}</p>
                                <p>{getLocalDate(item.expDate)}</p>
                                <p>{item.tasks.length}</p>
                                <hr />
                            </Link>
                        </div>
                    );
                })
                }
            </div>
        );
    }
}

export default ShowGoalsList;