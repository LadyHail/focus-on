import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTask } from '../utils/DbHelper.js';
import { timeLeft, getLocalDate } from '../utils/DateTime.js';
import { updateStatus } from '../utils/utils.js';

class TaskDetail extends Component {

    componentWillMount = () => {
        const id = this.props.id;
        const goalId = this.props.goalId;
        this.task = getTask(goalId, id);
        this.timeLeft = timeLeft(new Date(this.task.expDate));
        updateStatus(this.task, this.timeLeft, goalId);
    }

    render = () => {
        return (
            <div>
                <li><Link to={`/goal/edit/${this.props.goalId}/${this.task.id}/`}>EDIT TASK</Link></li>
                <button onClick={this.props.delete} data-id={this.task.id}>DELETE</button>
                <button onClick={this.props.completeTask} data-id={this.task.id}>Complete!</button>
                <p>{this.task.description}</p>
                <p>{getLocalDate(this.task.created)}</p>
                <p>{getLocalDate(this.task.expDate)}</p>
                <p>{this.timeLeft.days} days {this.timeLeft.hours} hours {this.timeLeft.minutes} minutes left </p>
            </div>
            )
    }
}

export default TaskDetail;