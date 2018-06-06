import React, { Component } from 'react';
import { getTask } from '../utils/DbHelper.js';
import { timeLeft } from '../utils/DateTime.js';

//TODO add date validation
class TaskDetail extends Component {

    componentWillMount = () => {
        const id = this.props.id;
        const goalId = this.props.goalId;
        this.task = getTask(goalId, id);
        this.timeLeft = timeLeft(new Date(this.task.expDate));
    }

    render = () => {
        return (
            <div>
                <p>{this.task.description}</p>
                <p>{this.task.created}</p>
                <p>{this.task.expDate}</p>
                <p>{this.timeLeft.days} days {this.timeLeft.hours} hours {this.timeLeft.minutes} minutes left </p>
            </div>
            )
    }
}

export default TaskDetail;