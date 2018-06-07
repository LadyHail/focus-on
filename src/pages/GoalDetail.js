import React, { Component } from 'react';
import { getGoal } from '../utils/DbHelper.js';
import { timeLeft, getLocalDate } from '../utils/DateTime.js';
import TaskDetail from './TaskDetail.js';

class GoalDetail extends Component {

    componentWillMount = () => {
        const id = this.props.match.params.id;
        this.goal = getGoal(id);
        this.timeLeft = timeLeft(new Date(this.goal.expDate));
    }

    render = () => {
        return (
            <div>
                <p>{this.goal.description}</p>
                <p>{getLocalDate(this.goal.created)}</p>
                <p>{getLocalDate(this.goal.expDate)}</p>
                <p>{this.timeLeft.days} days {this.timeLeft.hours} hours {this.timeLeft.minutes} minutes left </p>
                {this.goal.tasks.map(t => {
                    return (
                        <div key={t.id}>
                            <TaskDetail id={t.id} goalId={this.goal.id} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default GoalDetail;