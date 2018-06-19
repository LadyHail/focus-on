import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAll, updateStatus, STATUS } from '../utils/dbHelper.js';
import { timeLeft } from '../utils/dateTime.js';
import { sortGoals } from '../utils/utils.js';
import ObjDone from '../components/ObjDone.js';
import ObjFailed from '../components/ObjFailed.js';
import ObjWaiting from '../components/ObjWaiting';

class ShowGoalsList extends Component {

    componentWillMount = () => {
        const goals = getAll();
        this.goals = sortGoals(goals);
        this.times = this.goals.map(g => {
            const time = timeLeft(new Date(g.expDate));
            updateStatus(g, time);
            return { 'id': g.id, 'time': time };
        });
    }

    render = () => {
        return (
            <div className="goals-list">
                {this.goals.map(item => {
                    const time = this.times.find(g => g.id === item.id).time;
                    return (
                        <div key={item.id} data-id={item.id} className="list-item">
                            <Link to={`/goal/${item.id}/`} className="goal-link">
                                {item.status === STATUS.waiting ?
                                    <ObjWaiting obj={item} time={time} />
                                    :
                                    item.status === STATUS.done ?
                                        <ObjDone obj={item} />
                                        :
                                        item.status === STATUS.failed ?
                                            <ObjFailed obj={item} time={time} />
                                        :
                                            null
                                }                               
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