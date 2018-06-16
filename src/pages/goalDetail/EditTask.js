import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getTask, getGoal } from '../../utils/dbHelper.js';
import { getDate, getExpDate, getExpTime } from '../../utils/dateTime.js';
import { updateTask } from '../../utils/utils.js';
import Notification from '../../components/Notification.js';
import RenderToBody from '../../components/RenderToBody';

class EditTask extends Component {

    state = {
        goBack: false,
        notify: false
    }

    componentWillMount = () => {
        this.goalId = this.props.match.params.goalId;
        const goal = getGoal(this.goalId);
        this.goalExpDate = getExpDate(new Date(goal.expDate));
        const taskId = this.props.match.params.taskId;
        this.task = getTask(this.goalId, taskId);
        const date = new Date(this.task.expDate);
        this.expDate = getExpDate(date);
        this.expTime = getExpTime(date);
    }

    save = (e) => {
        e.preventDefault();
        updateTask(this.goalId, this.task.id);
        this.setState({ goBack: true });
        this.setState({ notify: true });
    }

    render = () => {
        return (
            <div>
                {this.state.notify ? <RenderToBody><Notification msg="Changes saved!" level="success" /></RenderToBody> : null}
                {this.state.goBack === true ?
                    <Redirect to={`/goal/${this.goalId}/`} />
                    :
                    <form onSubmit={this.save} id="add-goal">
                        <input type="text" defaultValue={this.task.description} required id="task-desc" className="task-desc" />
                        <input type="date" defaultValue={this.expDate} id="task-date" className="task-date" required min={getDate()} max={this.goalExpDate}/>
                        <input type="time" defaultValue={this.expTime} id="task-time" className="task-time" required />
                        <button type="submit">Save</button>
                    </form>
                }
            </div>
        )
    }
}

export default EditTask;