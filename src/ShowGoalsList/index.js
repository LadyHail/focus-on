import React, { Component } from 'react';

class ShowGoalsList extends Component {

    state = {
        goals: []
    }

    componentWillMount = () => {
        this.getAll();
    }

    getAll = () => {
        const keys = Object.keys(window.localStorage);
        let goals = [];
        let goal = {};
        keys.forEach(function (key) {
            goal = window.localStorage.getItem(key);
            goals.push(JSON.parse(goal));
        });
        this.setState({ goals });
    }

    render = () => {
        return (
            <div>
                {this.state.goals.map(item =>
                    <div key={item.id}>
                        <p>{item.description}</p>
                        <p>{item.date}</p>
                    </div>
                )
                }
            </div>
            )
    }
}

export default ShowGoalsList;