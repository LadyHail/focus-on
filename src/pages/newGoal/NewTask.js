import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RemoveTask from './RemoveTask.js';
import { getDate } from '../../utils/dateTime.js';

class NewTask extends Component {
    constructor(props) {
        super(props);
        this.minTime = "00:00";
        this.maxTime = "23:59";
        this.calcTime = this.calcTime.bind(this);
    }

    static propTypes = {
        id: PropTypes.number.isRequired,
        removeBtnClick: PropTypes.func.isRequired,
        goalDate: PropTypes.string.isRequired,
        goalTime: PropTypes.string.isRequired,
        minTime: PropTypes.string.isRequired,
        maxTime: PropTypes.string.isRequired
    }

    state = {
        goalDate: new Date().toISOString().substring(0, 10),
        goalTime: new Date().toLocaleString().substring(12, 17),
        minTime: "00:00",
        maxTime: "23:59",
        selfUpdate: false
    }

    static getDerivedStateFromProps = (props, state) => {
        if (!state.selfUpdate) {
            state.goalDate = props.goalDate;
            state.goalTime = props.goalTime;
            state.minTime = props.minTime;
            state.maxTime = props.maxTime;
        }
        state.selfUpdate = false;
        return state;
    }

    calcTime(e) {
        const date = e.target.value;
        if (date === this.state.goalDate) {
            this.setState({ maxTime: this.state.goalTime });
            this.maxTime = this.state.goalTime;
        } else {
            this.setState({ maxTime: "23:59" });
            this.maxTime = "23:59";
        }

        if (date === new Date().toISOString().substring(0, 10)) {
            this.setState({ minTime: new Date().toLocaleString().substring(12, 17) });
            this.minTime = new Date().toLocaleString().substring(12, 17);
        } else {
            this.setState({ minTime: "00:00" });
            this.minTime = "00:00";
        }
        this.setState({ selfUpdate: true });
    }

    render = () => {
        return (
            <div className="task" data-id={this.props.id}>
                <label>How to achieve my goal?<input type="text" placeholder="eg. Learn HTML" required id="task-desc" className="task-desc description" maxLength="250" /></label>
                <label>I want to complete this task until: <input type="date" defaultValue={getDate()} id="task-date" className="task-date" required min={getDate()} max={this.state.goalDate} onChange={this.calcTime} /></label>
                <input type="time" min={this.state.minTime} max={this.state.maxTime} id="task-time" className="task-time" required />
                <RemoveTask btnClick={this.props.removeBtnClick} id={this.props.id} />
            </div>
        );
    }
}

export default NewTask;