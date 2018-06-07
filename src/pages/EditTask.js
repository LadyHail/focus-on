import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getTask, saveGoal } from '../utils/DbHelper.js';
import { getDate, getExpDate, getExpTime } from '../utils/DateTime.js';
import { updateTask } from '../utils/utils.js';

class EditTask extends Component {

    state = {
        goBack: false
    }

    componentWillMount = () => {
        this.goalId = this.props.match.params.goalId;
        const taskId = this.props.match.params.taskId;
        this.task = getTask(this.goalId, taskId);
        const date = new Date(this.task.expDate);
        this.expDate = getExpDate(date);
        this.expTime = getExpTime(date);
    }

    save = (e) => {
        e.preventDefault;
        updateTask(this.goalId, this.task.id);
        this.setState({ goBack: true });
    }

    render = () => {
        return (
            <div>
                {this.state.goBack === true ?
                    <Redirect to={`/goal/${this.goalId}/`} />
                    :
                    <form onSubmit={this.save} id="add-goal">
                        <input type="text" defaultValue={this.task.description} required id="task-desc" className="task-desc" />
                        <input type="date" defaultValue={this.expDate} id="task-date" className="task-date" required min={this.expDate} />
                        <input type="time" defaultValue={this.expTime} id="task-time" className="task-time" required />
                        <button type="submit">Save</button>
                    </form>
                }
            </div>
        )
    }
}

export default EditTask;