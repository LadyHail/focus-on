import React, { Component } from 'react';
import { setTaskId, getGoal } from '../../utils/dbHelper.js';
import { getDate, getExpDate } from '../../utils/dateTime.js';
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
        }
    }

    save = (e) => {
        e.preventDefault();
        const taskHTML = document.getElementById('task');
        const task = createTaskObj(taskHTML);
        if (task !== null) {
            addTask(this.goal.id, task);
            this.setState({ goBack: true });
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
                        {this.state.notify ? <RenderToBody><Notification msg="New task added!" level="success" /></RenderToBody> : null}
                        {this.state.goBack === true ?
                            <Redirect to={`/goal/${this.goal.id}/`} />
                            :
                            <form onSubmit={this.save}>
                                <div className="task" data-id={this.id} id="task">
                                    <input type="text" placeholder="How to achieve my goal?" required id="task-desc" className="task-desc" />
                                    <input type="date" defaultValue={getDate()} id="task-date" className="task-date" required min={getDate()} max={this.goalDate} />
                                    <input type="time" defaultValue="23:59" id="task-time" className="task-time" required />
                                </div>
                                <button type="submit">Save</button>
                            </form>
                        }    
                     </div>
                }
            </div>
        );
    }
}

export default NewTask;