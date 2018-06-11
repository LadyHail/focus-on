import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getGoal, saveGoal } from '../utils/DbHelper.js';
import { timeLeft, getLocalDate } from '../utils/DateTime.js';
import { deleteTask, updateStatus, STATUS } from '../utils/utils.js';
import TaskDetail from './TaskDetail.js';

class GoalDetail extends Component {
    constructor(props) {
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
        this.complete = this.complete.bind(this);
    }

    state = {
        tasks: null
    }

    componentWillMount = () => {
        this.id = this.props.match.params.id;
        this.goal = getGoal(this.id);
        this.timeLeft = timeLeft(new Date(this.goal.expDate));
        updateStatus(this.goal, this.timeLeft);
        this.setState({ tasks: this.goal.tasks.length });
    }

    deleteTask = (e) => {
        e.preventDefault();
        const taskId = e.target.getAttribute('data-id');
        deleteTask(this.id, taskId);
        this.goal = getGoal(this.id);
        this.setState({ tasks: this.goal.tasks.length });
    }

    complete = (e) => {
        const taskId = e.target.getAttribute('data-id');
        if (taskId) {
            const index = this.goal.tasks.findIndex(t => t.id === taskId);
            const task = this.goal.tasks[index];
            task.status = STATUS.done;
            this.goal.tasks[index] = task;
        } else {
            this.goal.status = STATUS.done;
        }        
        saveGoal("goal" + this.goal.id, JSON.stringify(this.goal));
    }

    render = () => {
        return (
            <div>
                <li><Link to={`/goal/edit/${this.id}`}>EDIT</Link></li>
                <li><Link to={`/goal/add/${this.id}`}>ADD</Link></li>
                <button onClick={this.complete}>Complete!</button>
                <p>{this.goal.description}</p>
                <p>{getLocalDate(this.goal.created)}</p>
                <p>{getLocalDate(this.goal.expDate)}</p>
                <p>{this.timeLeft.days} days {this.timeLeft.hours} hours {this.timeLeft.minutes} minutes left </p>
                {this.goal.tasks.map(t => {
                    return (
                        <div key={t.id}>
                            <TaskDetail id={t.id} goalId={this.id} delete={this.deleteTask} completeTask={this.complete} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default GoalDetail;