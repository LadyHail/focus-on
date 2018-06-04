import React, { Component } from 'react';

//TODO show time left
class GoalDetail extends Component {

    componentWillMount = () => {
        const id = this.props.match.params.id;
        if (!isNaN(id)) {
            this.getGoal(id);
        }   
    }

    getGoal = (id) => {
        this.goal = window.localStorage.getItem('goal' + id);
        this.goal = JSON.parse(this.goal);
    }

    render = () => {
        return (
            <div>
                <p>{this.goal.description}</p>
                <p>{this.goal.created}</p>
                <p>{this.goal.expDate}</p>
                {this.goal.tasks.map(t => {
                    return (
                        <div key={t.id}>
                            <p>{t.description}</p>
                            <p>{t.created}</p>
                            <p>{t.expDate}</p>
                        </div>
                        )
                })}
            </div>
            )
    }
}

export default GoalDetail;