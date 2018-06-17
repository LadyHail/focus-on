import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAll, updateStatus, STATUS } from '../utils/dbHelper.js';
import { getLocalDate, timeLeft } from '../utils/dateTime.js';

class ShowGoalsList extends Component {

    componentWillMount = () => {
        const goals = getAll();
        let done = goals.filter(g => g.status === STATUS.done);
        let failed = goals.filter(g => g.status === STATUS.failed);
        let waiting = goals.filter(g => g.status === STATUS.waiting);
        done.sort((a, b) => new Date(a.expDate) - new Date(b.expDate));
        failed.sort((a, b) => new Date(a.expDate) - new Date(b.expDate));
        waiting.sort((a, b) => new Date(a.expDate) - new Date(b.expDate));
        this.goals = [];
        failed.forEach(g => {
            this.goals.push(g);
        });
        waiting.forEach(g => {
            this.goals.push(g);
        });
        done.forEach(g => {
            this.goals.push(g);
        });
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
                    const time = this.times.find(g => g.id === item.id);
                    return (
                        <div key={item.id} data-id={item.id} className={`list-item ${item.status === STATUS.done ? "done" : item.status === STATUS.failed ? "failed" : item.status === STATUS.waiting ? "waiting" : null}`}>
                            <Link to={`/goal/${item.id}/`} className="goal-link">
                                <p>{item.description}</p>
                                <p>{getLocalDate(item.created)}</p>
                                <p>{getLocalDate(item.expDate)}</p>
                                <p>{item.tasks.length}</p>
                                {item.status === STATUS.waiting ?
                                    <p>{time.time.days} days {time.time.hours} hours {time.time.minutes} minutes left.</p>
                                    :
                                    item.status === STATUS.done ?
                                        <p>I did it!</p>
                                        :
                                        <p>The challange expired {-time.time.days} days {-time.time.hours} hours {-time.time.minutes} minutes ago.</p>
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