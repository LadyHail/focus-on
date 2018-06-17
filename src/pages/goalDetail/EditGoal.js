import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getGoal } from '../../utils/dbHelper.js';
import { getExpDate, getExpTime } from '../../utils/dateTime.js';
import { updateGoal } from '../../utils/utils.js';
import Notification from '../../components/Notification.js';
import RenderToBody from '../../components/RenderToBody';
import NotFound from '../../components/NotFound';

class EditGoal extends Component {

    state = {
        goBack: false,
        notify: false,
        isError: false
    }

    componentWillMount = () => {
        const id = this.props.match.params.id;
        this.goal = getGoal(id);
        try {
            const date = new Date(this.goal.expDate);
            this.expDate = getExpDate(date);
            this.expTime = getExpTime(date);
        } catch (e) {
            console.log(e);
            this.setState({ isError: true });
        }
    }

    save = (e) => {
        e.preventDefault();
        const isSuccess = updateGoal(this.goal.id);
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
        const _this = this;
        return (
            <div>
                {this.state.isError ? <NotFound /> :
                    <div>
                        {this.state.notify ? <RenderToBody><Notification msg={this.msg} level={this.level} /></RenderToBody> : null}
                        {this.state.goBack ?
                            <Redirect to={`/goal/${_this.goal.id}/`} />
                            :
                            <div>
                                <p>{this.goal.description}</p>
                                <form onSubmit={this.save} id="add-goal">
                                    <input type="date" required id="goal-date" min={this.expDate} defaultValue={this.expDate} max="2100-12-31" />
                                    <input type="time" required id="goal-time" defaultValue={this.expTime} />
                                    <button type="submit">Save</button>
                                </form>
                            </div>
                        }
                    </div>
                }
            </div>
            )
    }
}

export default EditGoal;