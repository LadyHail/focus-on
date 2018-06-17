import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getGoal, saveGoal, getTask, updateStatus, STATUS } from '../utils/dbHelper.js';
import { timeLeft, getLocalDate, spentTime } from '../utils/dateTime.js';
import { deleteTask } from '../utils/utils.js';
import TaskDetail from '../pages/goalDetail/TaskDetail.js';
import Notification from '../components/Notification.js';
import RenderToBody from '../components/RenderToBody.js';
import NotFound from '../components/NotFound.js';
import ObjDone from '../components/ObjDone';
import ObjFailed from '../components/ObjFailed';
import ObjWaiting from '../components/ObjWaiting';

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
        isError: false
    }

    componentWillMount = () => {
        this.id = this.props.match.params.id;
        this.goal = getGoal(this.id);
        try {
            this.timeLeft = timeLeft(new Date(this.goal.expDate));
            const isSuccess = updateStatus(this.goal, this.timeLeft);
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

    deleteTask = (e) => {
        e.preventDefault();
        const taskId = e.target.getAttribute('data-id');
        let isSuccess = deleteTask(this.id, taskId);
        if (!isSuccess) {
            this.notifyMsg = 'Ooops... Something went wrong!';
            this.notifyLvl = 'error';
        } else {
            this.notifyMsg = 'Task deleted!';
            this.notifyLvl = 'warning';
        }
        this.goal = getGoal(this.id);
        this.setState({ tasks: this.goal.tasks.length });
        this.setState({ notify: true });
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
        this.setState({ notify: true });
        this.notifyMsg = 'Completed!';
        this.notifyLvl = 'success';
    }

    render = () => {
        return (
            <div className="goal-detail">
                {this.state.isError ?
                    <NotFound />
                    :                   
                    this.goal.status === STATUS.done ?
                        <div>                            
                            <ObjDone obj={this.goal} />
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
                            <div>
                                {this.state.notify ? <RenderToBody><Notification msg={this.notifyMsg} level={this.notifyLvl} /></RenderToBody> : null}
                                <ul>
                                    <li><Link to={`/goal/edit/${this.id}`}>I need more time!</Link></li>
                                </ul>
                                <ObjFailed obj={this.goal} time={this.timeLeft} />
                                {this.goal.tasks.map(t => {
                                    return (
                                        <div key={t.id}>
                                            <TaskDetail id={t.id} goalId={this.id} delete={this.deleteTask} completeTask={this.complete} />
                                        </div>
                                    );
                                })}
                            </div>
                            :
                            <div>
                                {this.state.notify ? <RenderToBody><Notification msg={this.notifyMsg} level={this.notifyLvl} /></RenderToBody> : null}
                                <ul>
                                    <li><Link to={`/goal/edit/${this.id}`}>I need more time!</Link></li>
                                    <li><Link to={`/goal/add/${this.id}`}>I want to set new task</Link></li>
                                </ul>
                                <button onClick={this.complete} className="btn-success btn-save">Complete!</button>                                
                                <ObjWaiting obj={this.goal} time={this.timeLeft} />
                                {this.goal.tasks.map(t => {
                                    return (
                                        <div key={t.id}>
                                            <TaskDetail id={t.id} goalId={this.id} delete={this.deleteTask} completeTask={this.complete} />
                                        </div>
                                    );
                                })}
                            </div>
                    
                }
            </div>
        );
    }
}

export default GoalDetail;