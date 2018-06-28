import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAll, updateStatus, STATUS } from '../utils/dbHelper.js';
import { timeLeft } from '../utils/dateTime.js';
import { sortGoals } from '../utils/utils.js';
import ObjDone from '../components/ObjDone.js';
import ObjFailed from '../components/ObjFailed.js';
import ObjWaiting from '../components/ObjWaiting.js';

class ShowGoalsList extends Component {

    state = {
        times: [] // Stores all timeleft for Goals.
    }

    componentWillMount = () => {
        const goals = getAll();
        this.goals = sortGoals(goals);
        const times = this.goals.map(g => {
            const time = timeLeft(new Date(g.expDate));
            updateStatus(g, time);
            return { 'id': g.id, 'time': time };
        });
        this.setState({ times: times });
    }

    // Is responsible for live time counting.
    componentDidMount = () => {
        this.interval = setInterval(() => {
            const times = this.goals.map(g => {
                const time = timeLeft(new Date(g.expDate));
                updateStatus(g, time);
                return { 'id': g.id, 'time': time };
            });
            this.setState({ times: times });
        }, 1000);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    render = () => {
        return (
            <div className="goals-list">
                {this.goals.length === 0 ?
                    <p className="goal-div failed">No goals found.</p>
                    :                    
                        this.goals.map(item => {
                            const time = this.state.times.find(g => g.id === item.id).time;
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