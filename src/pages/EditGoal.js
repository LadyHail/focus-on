import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getGoal } from '../utils/DbHelper.js';
import { getExpDate, getExpTime } from '../utils/DateTime.js';
import { updateGoal } from '../utils/utils.js';

class EditGoal extends Component {

    state = {
        goBack: false
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
    }

    render = () => {
        return (
            <div>
                {this.state.goBack === true ?
                    <Redirect to={`/goal/${this.goal.id}/`} />
                    :
                    <div>
                        <p>{this.goal.description}</p>
                        <form onSubmit={this.save} id="add-goal">
                            <input type="date" required id="goal-date" min={this.expDate} defaultValue={this.expDate} />
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