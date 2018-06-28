import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getTask, getGoal } from '../../utils/dbHelper.js';
import { getDate, getExpDate, getExpTime } from '../../utils/dateTime.js';
import { updateTask } from '../../utils/utils.js';
import Notification from '../../components/Notification.js';
import RenderToBody from '../../components/RenderToBody.js';
import NotFound from '../../components/NotFound.js';

class EditTask extends Component {
    constructor(props) {
        super(props);
        this.calcTime = this.calcTime.bind(this);
    }

    state = {
        goBack: false,
        notify: false,
        isError: false,
        minTime: '00:00',
        maxTime: '23:59'
    }

    componentWillMount = () => {
        this.goalId = this.props.match.params.goalId;
        const goal = getGoal(this.goalId);
        const taskId = this.props.match.params.taskId;
        this.task = getTask(this.goalId, taskId);
        if (goal === null || this.task === null) {
            this.setState({ isError: true });
        } else {
            this.goalExpDate = getExpDate(new Date(goal.expDate));
            this.goalExpTime = getExpTime(new Date(goal.expDate));
            const date = new Date(this.task.expDate);
            this.expDate = getExpDate(date);
            this.expTime = getExpTime(date);
        }
    }

    componentDidMount() {
        this.calcTime();
    }

    calcTime() {
        const taskDate = document.getElementById('task-date').value;
        if (taskDate === this.goalExpDate) {
            this.setState({ maxTime: this.goalExpTime });
        } else {
            this.setState({ maxTime: '23:59' });
        }

        if (taskDate === new Date().toISOString().substring(0, 10)) {
            this.setState({ minTime: new Date().toLocaleString().substring(12, 17) });
        } else {
            this.setState({ minTime: '00:00' });
        }
    }

    save = (e) => {
        e.preventDefault();
        const isSuccess = updateTask(this.goalId, this.task.id);
        if (!isSuccess) {
            this.msg = 'Oops... Something went wrong!';
            this.level = 'error';
            this.setState({ goBack: false });
        } else {
            this.msg = 'Changes saved!';
            this.level = 'success';
            this.setState({ goBack: true });
        }
        this.setState({ notify: true });
    }

    render = () => {
        return (
            <div>
                {this.state.isError ? <NotFound /> :
                    <div>
                        {this.state.notify ? <RenderToBody><Notification msg={this.msg} level={this.level} /></RenderToBody> : null}
                        {this.state.goBack === true ?
                            <Redirect to={`/goal/${this.goalId}/`} />
                            :
                            <form onSubmit={this.save} id="add-goal" className="edit">
                                <input type="text" defaultValue={this.task.description} required id="task-desc" className="task-desc" />
                                <input type="date" defaultValue={this.expDate} id="task-date" className="task-date" required min={getDate()} max={this.goalExpDate} onChange={this.calcTime} />
                                <input type="time" min={this.state.minTime} max={this.state.maxTime} id="task-time" className="task-time" required />
                                <button type="submit" className="btn-success btn-save"><i className="fas fa-save fa-lg btn-img"></i>Save changes!</button>
                            </form>}
                        </div>
                }
            </div>
        )
    }
}

export default EditTask;