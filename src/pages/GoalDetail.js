﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getGoal, saveGoal, getTask, updateStatus, STATUS } from '../utils/dbHelper.js';
import { timeLeft } from '../utils/dateTime.js';
import { deleteTask } from '../utils/utils.js';
import TaskDetail from '../pages/goalDetail/TaskDetail.js';
import Notification from '../components/Notification.js';
import RenderToBody from '../components/RenderToBody.js';
import NotFound from '../components/NotFound.js';
import ObjDone from '../components/ObjDone.js';
import ObjFailed from '../components/ObjFailed.js';
import ObjWaiting from '../components/ObjWaiting.js';
import Modal from '../components/Modal.js';

class GoalDetail extends Component {
    constructor(props) {
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
        this.complete = this.complete.bind(this);
        this.notifyMsg = '';
        this.notifyLvl = '';
    }

    state = {
        tasks: null,
        notify: false,
        isError: false,
        timeLeft: null,
        showModal: false
    }

    componentWillMount = () => {
        this.id = this.props.match.params.id;
        this.goal = getGoal(this.id);
        try {
            const time = timeLeft(new Date(this.goal.expDate));
            this.setState({ timeLeft: time});
            const isSuccess = updateStatus(this.goal, time);
            if (!isSuccess) {
                this.notifyMsg = 'Ooops... Something went wrong!';
                this.notifyLvl = 'error';
            }
            this.setState({ tasks: this.goal.tasks.length });
        } catch (e) {
            console.log(e);
            this.setState({ isError: true });
        }
    }

    componentDidMount = () => {
        this.interval = setInterval(() => {
            try {
                const time = timeLeft(new Date(this.goal.expDate));
                updateStatus(this.goal, time);
                this.setState({ timeLeft: time });
            } catch (e) {
                console.log(e);
                clearInterval(this.interval);
            }
        }, 1000);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    deleteTask = (e) => {
        e.preventDefault();
        const taskId = e.target.getAttribute('data-id');
        let isSuccess = deleteTask(this.id, taskId);
        if (!isSuccess) {
            this.notifyMsg = 'Ooops... Something went wrong! There must be at least one task specified!';
            this.notifyLvl = 'error';
        } else {
            this.notifyMsg = 'Task deleted!';
            this.notifyLvl = 'warning';
        }
        this.goal = getGoal(this.id);
        this.setState({ tasks: this.goal.tasks.length });
        this.setState({ notify: true });
        setTimeout(() => {
            this.setState({ notify: false });
        }, 500);
    }
    
    complete = (e) => {
        const taskId = e.target.getAttribute('data-id');
        if (taskId) {
            const index = this.goal.tasks.findIndex(t => t.id === taskId);
            const task = getTask(this.goal.id, taskId);
            try {
                task.status = STATUS.done;
                task.done = new Date().toUTCString();
                this.goal.tasks[index] = task;
            } catch (e) {
                console.log(e);
                this.notifyMsg = 'Ooops... Something went wrong!';
                this.notifyLvl = 'error';
            }
        } else {
            this.goal.status = STATUS.done;
            this.goal.tasks.forEach(t => {
                if (t.status === STATUS.waiting) {
                    t.status = STATUS.done;
                    t.done = new Date().toUTCString();
                }
            });
            this.goal.done = new Date().toUTCString();
        }        
        saveGoal("goal" + this.goal.id, this.goal);
        this.setState({ showModal: true });
        this.notifyMsg = 'Completed!';
        this.notifyLvl = 'success';
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    render = () => {
        return (
            <div className="goal-detail">
                {this.state.isError ?
                    <NotFound />
                    :
                    <div>
                        <Modal show={this.state.showModal} >
                            <p>Congratulations!</p>
                            <p><i className="fas fa-star fa-7x img-gold"></i></p>
                            <button onClick={this.closeModal} className="btn-success">I did it!</button>
                        </Modal>
                        {this.goal.status === STATUS.done ?
                            <div className="width">
                                <div className="goal-done">
                                    <ObjDone obj={this.goal} />
                                </div>
                                {this.goal.tasks.map(t => {
                                    return (
                                        <div key={t.id}>
                                            <TaskDetail id={t.id} goalId={this.id} delete={this.deleteTask} completeTask={this.complete} />
                                        </div>
                                    );
                                })}
                            </div>
                            :
                            this.goal.status === STATUS.failed ?
                                <div className="width">
                                    {this.state.notify ? <RenderToBody><Notification msg={this.notifyMsg} level={this.notifyLvl} /></RenderToBody> : null}
                                    <div className="goal-container failed">
                                        <ObjFailed obj={this.goal} time={this.state.timeLeft} />
                                        <div className="btns-list">
                                            <ul>
                                                <li><Link to={`/goal/edit/${this.id}`}><button className="btn"><i className="fas fa-stopwatch fa-lg btn-img"></i>I need more time!</button></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    {this.goal.tasks.map(t => {
                                        return (
                                            <div key={t.id}>
                                                <TaskDetail id={t.id} goalId={this.id} delete={this.deleteTask} completeTask={this.complete} />
                                            </div>
                                        );
                                    })}
                                </div>
                                :
                                <div className="width">   
                                    {this.state.notify ? <RenderToBody><Notification msg={this.notifyMsg} level={this.notifyLvl} /></RenderToBody> : null}
                                    <div className="goal-container waiting">
                                        <ObjWaiting obj={this.goal} time={this.state.timeLeft} />
                                        <div className="btns-list">
                                            <ul>
                                                <li><Link to={`/goal/edit/${this.id}`}><button className="btn"><i className="fas fa-stopwatch fa-lg btn-img"></i>I need more time!</button></Link></li>
                                                <li><Link to={`/goal/add/${this.id}`}><button className="btn"><i className="fas fa-plus fa-lg btn-img"></i>I want to set new task.</button></Link></li>
                                                <li><button onClick={this.complete} className="btn-success btn-save"><i className="fas fa-check fa-lg btn-img"></i>Complete!</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                    {this.goal.tasks.map(t => {
                                        return (
                                            <div key={t.id}>
                                                <TaskDetail id={t.id} goalId={this.id} delete={this.deleteTask} completeTask={this.complete} />
                                            </div>
                                        );
                                    })}
                                </div>}
                        </div>
                    
                }
            </div>
        );
    }
}

export default GoalDetail;