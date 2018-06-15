import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getTask } from '../../utils/DbHelper.js';
import { timeLeft, getLocalDate } from '../../utils/DateTime.js';
import { updateStatus, STATUS } from '../../utils/utils.js';

//TODO parse IDs to numbers
class TaskDetail extends Component {

    static propTypes = {
        completeTask: PropTypes.func.isRequired,
        delete: PropTypes.func.isRequired,
        goalId: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }

    shouldComponentUpdate = () => {
        this.task = getTask(this.goalId, this.task.id);
        return true;
    }

    componentWillMount = () => {
        const id = this.props.id;
        this.goalId = this.props.goalId;
        this.task = getTask(this.goalId, id);
        this.timeLeft = timeLeft(new Date(this.task.expDate));
        updateStatus(this.task, this.timeLeft, this.goalId);
    }

    render = () => {
        return (
            <div>
                {this.task.status === STATUS.done ?
                    <div>
                        <p>I did it! {this.task.description} is complete.</p>
                        <p>I started {getLocalDate(this.task.created)}</p>
                        <p>I finished {getLocalDate(this.task.done)}</p>
                    </div>
                    :
                    <div>
                        <li><Link to={`/goal/edit/${this.props.goalId}/${this.task.id}/`}>EDIT TASK</Link></li>
                        <button onClick={this.props.delete} data-id={this.task.id}>DELETE</button>
                        <button onClick={this.props.completeTask} data-id={this.task.id}>Complete!</button>
                        <p>{this.task.description}</p>
                        <p>{getLocalDate(this.task.created)}</p>
                        <p>{getLocalDate(this.task.expDate)}</p>
                        <p>{this.timeLeft.days} days {this.timeLeft.hours} hours {this.timeLeft.minutes} minutes left </p>
                    </div>
                    }
            </div>
            )
    }
}

export default TaskDetail;