import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getTask, getGoal, STATUS, updateStatus } from '../../utils/dbHelper.js';
import { timeLeft, getLocalDate, spentTime } from '../../utils/dateTime.js';
import NotFound from '../../components/NotFound';

class TaskDetail extends Component {

    state = {
        isError: false,
        timeLeft: null
    }

    static propTypes = {
        completeTask: PropTypes.func.isRequired,
        delete: PropTypes.func.isRequired,
        goalId: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }

    shouldComponentUpdate = () => {
        this.task = getTask(this.goalId, this.task.id);
        if (this.task === null) {
            this.setState({ isError: true });
        }
        return true;
    }

    componentWillMount = () => {
        const id = this.props.id;
        this.goalId = this.props.goalId;
        this.goal = getGoal(this.goalId);
        this.task = getTask(this.goalId, id);
        if (this.goal === null || this.task === null) {
            this.setState({ isError: true });
        } else {
            const time = timeLeft(new Date(this.task.expDate));
            this.setState({ timeLeft: time });
            updateStatus(this.task, time, this.goalId);
        }
    }

    componentDidMount = () => {
        this.interval = setInterval(() => {
            const time = timeLeft(new Date(this.task.expDate));
            this.goal = getGoal(this.goalId);
            updateStatus(this.task, time, this.goalId);
            this.setState({ timeLeft: time });
        }, 1000);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    render = () => {
        return (
            <div>
                {this.state.isError ? <NotFound /> :
                    <div className="task-container">
                        {this.task.status === STATUS.done ?
                            <div className="done task-div">
                                <p>I did it! {this.task.description} is completed.</p>
                                <p>I started {getLocalDate(this.task.created)}</p>
                                <p>I finished {getLocalDate(this.task.done)}</p>
                                <p>I spent {spentTime(this.task.created, this.task.done).days} days {spentTime(this.task.created, this.task.done).hours} hours {spentTime(this.task.created, this.task.done).minutes} minutes {spentTime(this.task.created, this.task.done).seconds} seconds.</p>
                            </div>
                            :
                            this.task.status === STATUS.failed && this.goal.status !== STATUS.failed ?
                                <div className="failed">
                                    <div className="task-div">
                                        <p>I want to {this.task.description}.</p>
                                        <p>I started {getLocalDate(this.task.created)}.</p>
                                        <p>I wanted to finish until {getLocalDate(this.task.expDate)}.</p>
                                        <p>The time ended {this.state.timeLeft.days} days {this.state.timeLeft.hours} hours {this.state.timeLeft.minutes} minutes {this.state.timeLeft.seconds} seconds ago. </p>
                                    </div>
                                    <div className="btns-list">
                                        <ul>
                                            <li><Link to={`/goal/edit/${this.props.goalId}/${this.task.id}/`}><button className="btn"><i className="fas fa-redo fa-lg btn-img"></i>I want to try again.</button></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                :
                                this.task.status === STATUS.failed && this.goal.status === STATUS.failed ?
                                    <div className="failed-both task-div">
                                        <p>I wanted to {this.task.description}.</p>
                                        <p>I started {getLocalDate(this.task.created)}.</p>
                                        <p>I wanted to finish until {getLocalDate(this.task.expDate)}.</p>
                                        <p>I failed the task because the goal expired.</p>
                                    </div>
                                    :
                                    <div className="waiting">
                                        <div className="task-div">
                                            <p>I want to {this.task.description}.</p>
                                            <p>I started {getLocalDate(this.task.created)}.</p>
                                            <p>I want to finish until {getLocalDate(this.task.expDate)}.</p>
                                            <p>I still have {this.state.timeLeft.days} days {this.state.timeLeft.hours} hours {this.state.timeLeft.minutes} minutes {this.state.timeLeft.seconds} seconds left.</p>
                                        </div>
                                        <div className="btns-list">
                                            <ul>
                                                <li><Link to={`/goal/edit/${this.props.goalId}/${this.task.id}/`}><button className="btn"><i className="fas fa-edit fa-lg btn-img"></i>I want to change something.</button></Link></li>
                                                <li><button onClick={this.props.delete} data-id={this.task.id} className="btn"><i className="fas fa-trash-alt fa-lg btn-img"></i>I decide to delete the task.</button></li>
                                                <li><button onClick={this.props.completeTask} data-id={this.task.id} className="btn-success btn-save"><i className="fas fa-check fa-lg btn-img"></i>Complete!</button></li>
                                            </ul>
                                        </div>
                                    </div>
                        }
                    </div>
                }
            </div>
            )
    }
}

export default TaskDetail;