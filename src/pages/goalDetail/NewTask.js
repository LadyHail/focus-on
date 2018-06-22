﻿import React, { Component } from 'react';
import { setTaskId, getGoal } from '../../utils/dbHelper.js';
import { getDate, getExpDate, getExpTime } from '../../utils/dateTime.js';
import { createTaskObj, addTask } from '../../utils/utils.js';
import { Redirect } from 'react-router-dom';
import Notification from '../../components/Notification.js';
import RenderToBody from '../../components/RenderToBody';
import NotFound from '../../components/NotFound';

class NewTask extends Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
    }

    state = {
        goBack: false,
        notify: false,
        invalidId: false,
        nullGoal: false,
        isError: false
    }

    componentWillMount = () => {
        const goalId = this.props.match.params.id;
        this.id = setTaskId(goalId);
        if (this.id === null) {
            this.setState({ invalidId: true });
        }
        this.goal = getGoal(goalId);
        if (this.goal === null) {
            this.setState({ nullGoal: true });
        } else {
            this.goalDate = getExpDate(new Date(this.goal.expDate));
            this.goalTime = getExpTime(new Date(this.goal.expDate));
        }
    }

    save = (e) => {
        e.preventDefault();
        const taskHTML = document.getElementById('task');
        const task = createTaskObj(taskHTML);
        if (task !== null) {
            let isSuccess = addTask(this.goal.id, task);
            if (!isSuccess) {
                this.msg = 'Oops... Something went wrong!';
                this.level = 'error';
                this.setState({ goBack: false });
            } else {
                this.msg = 'New task added!';
                this.level = 'success';
                this.setState({ goBack: true });
            }
            this.setState({ notify: true });
        } else {
            this.setState({ isError: true });
        }
    }

    render = () => {
        return (
            <div>
                {this.state.invalidId | this.state.nullGoal | this.state.isError ?
                    <NotFound />
                    :
                    <div>
                        {this.state.notify ? <RenderToBody><Notification msg={this.msg} level={this.level} /></RenderToBody> : null}
                        {this.state.goBack === true ?
                            <Redirect to={`/goal/${this.goal.id}/`} />
                            :
                            <form onSubmit={this.save}>
                                <div className="task edit" data-id={this.id} id="task">
                                    <input type="text" placeholder="How to achieve my goal?" required id="task-desc" className="task-desc" />
                                    <input type="date" defaultValue={getDate()} id="task-date" className="task-date" required min={getDate()} max={this.goalDate} />
                                    <input type="time" defaultValue={this.goalTime} min={this.goalTime} id="task-time" className="task-time" required />
                                    <button type="submit" className="btn-success btn-save"><i className="fas fa-plus fa-lg btn-img"></i>Set new task!</button>
                                </div>
                                
                            </form>
                        }    
                     </div>
                }
            </div>
        );
    }
}

export default NewTask;