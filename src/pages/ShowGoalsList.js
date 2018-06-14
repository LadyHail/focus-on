import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAll } from '../utils/DbHelper.js';
import { getLocalDate } from '../utils/DateTime.js';

class ShowGoalsList extends Component {

    componentWillMount = () => {
        this.goals = getAll();
    }

    render = () => {
        return (
            <div className="goals-list">
                {this.goals.map(item => {
                    return (
                        <div key={item.id} data-id={item.id} className="list-item">
                            <Link to={`/goal/${item.id}/`} className="goal-link">
                                <p>{item.description}</p>
                                <p>{getLocalDate(item.created)}</p>
                                <p>{getLocalDate(item.expDate)}</p>
                                <p>{item.tasks.length}</p>
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