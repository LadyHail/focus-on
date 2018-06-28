import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { setTaskId, getGoal } from '../../utils/dbHelper.js';
import { getDate, getExpDate, getExpTime } from '../../utils/dateTime.js';
import { createTaskObj, addTask } from '../../utils/utils.js';
import Notification from '../../components/Notification.js';
import RenderToBody from '../../components/RenderToBody.js';
import NotFound from '../../components/NotFound.js';

class NewTask extends Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.calcTime = this.calcTime.bind(this);
    }

    state = {
        goBack: false,
        notify: false,
        invalidId: false,
        nullGoal: false,
        isError: false,
        minTime: '00:00',
        maxTime: '23:59'
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

    componentDidMount() {
        this.calcTime();
    }

    calcTime() {
        const taskDate = document.getElementById('task-date').value;
        if (taskDate === this.goalDate) {
            this.setState({ maxTime: this.goalTime });
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
                                    <input type="date" defaultValue={getDate()} id="task-date" className="task-date" required min={getDate()} max={this.goalDate} onChange={this.calcTime} />
                                    <input type="time" max={this.state.maxTime} min={this.state.minTime} id="task-time" className="task-time" required />
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