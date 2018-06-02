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
                    <div key={item.id} data-id={item.id}>
                        <p>{item.description}</p>
                        <p>{item.created}</p>
                        <p>{item.expDate}</p>
                        <p>{item.tasks.length}</p>
                        <hr />
                    </div>
                )
                }
            </div>
            )
    }
}

export default ShowGoalsList;