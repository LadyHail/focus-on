import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RemoveTask from './RemoveTask.js';
import { getDate } from '../../utils/dateTime.js';

class NewTask extends Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        removeBtnClick: PropTypes.func.isRequired,
        goalDate: PropTypes.string.isRequired,
        goalTime: PropTypes.string.isRequired
    }

    state = {
        goalDate: new Date().toISOString().substring(0, 10),
        goalTime: new Date().toLocaleString().substring(12, 17)
    }

    static getDerivedStateFromProps = (props, state) => {
        state.goalDate = props.goalDate;
        state.goalTime = props.goalTime;
        return state;
    }

    render = () => {
        return (
            <div className="task" data-id={this.props.id}>
                <label>How to achieve my goal?<input type="text" placeholder="eg. Learn HTML" required id="task-desc" className="task-desc description" maxLength="250" /></label>
                <label>I want to complete this task until: <input type="date" defaultValue={getDate()} id="task-date" className="task-date" required min={getDate()} max={this.state.goalDate} /></label>
                <input type="time" defaultValue={this.state.goalTime} min={this.state.goalTime} id="task-time" className="task-time" required />
                <RemoveTask btnClick={this.props.removeBtnClick} id={this.props.id} />
            </div>
        );
    }
}

export default NewTask;