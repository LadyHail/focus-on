import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getGoal } from '../../utils/dbHelper.js';
import { getExpDate, getExpTime } from '../../utils/dateTime.js';
import { updateGoal } from '../../utils/utils.js';
import Notification from '../../components/Notification.js';
import RenderToBody from '../../components/RenderToBody';

class EditGoal extends Component {

    state = {
        goBack: false,
        notify: false
    }

    componentWillMount = () => {
        const id = this.props.match.params.id;
        this.goal = getGoal(id);
        const date = new Date(this.goal.expDate);
        this.expDate = getExpDate(date);
        this.expTime = getExpTime(date);
    }

    save = (e) => {
        e.preventDefault();
        updateGoal(this.goal.id);
        this.setState({ goBack: true });
        this.setState({ notify: true });
    }

    render = () => {
        const _this = this;
        return (
            <div>
                {this.state.notify ? <RenderToBody><Notification msg="Changes saved!" level="success" /></RenderToBody> : null}
                {this.state.goBack ?
                    <Redirect to={`/goal/${_this.goal.id}/`} />
                    :
                    <div>
                        <p>{this.goal.description}</p>
                        <form onSubmit={this.save} id="add-goal">
                            <input type="date" required id="goal-date" min={this.expDate} defaultValue={this.expDate} max="2100-12-31"/>
                            <input type="time" required id="goal-time" defaultValue={this.expTime} />
                            <button type="submit">Save</button>
                        </form>
                    </div>
                }
            </div>
            )
    }
}

export default EditGoal;