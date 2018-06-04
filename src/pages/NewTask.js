import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RemoveTask from './newGoal/RemoveTask.js';
import { getDate } from '../utils/DateTime.js';

class NewTask extends Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        removeBtnClick: PropTypes.func.isRequired
    }

    render = () => {
        return (
            <div className="task" data-id={this.props.id}>
                <input type="text" placeholder="How to achieve my goal?" required id="task-desc" className="task-desc" />
                <input type="date" defaultValue={getDate()} id="task-date" className="task-date" required min={getDate()} />
                <input type="time" defaultValue="23:59" id="task-time" className="task-time" required />
                <RemoveTask btnClick={this.props.removeBtnClick} id={this.props.id} />
            </div>
        );
    }
}

export default NewTask;