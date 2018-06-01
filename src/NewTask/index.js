import React, { Component } from 'react';

class NewTask extends Component {

    state = {
        date: ''
    }

    componentWillMount = () => {
        this.setState({ date: this.getDate() });
    }

    getDate = () => {
        return new Date().toISOString().substring(0, 10);
    }

    render = () => {
        return (
            <div className="task" data-id={this.props.id}>
                <input type="text" placeholder="How to achieve my goal?" required id="task-desc" className="task-desc" />
                <input type="date" defaultValue={this.state.date} id="task-date" className="task-date" required />
                <input type="time" defaultValue="23:59" id="task-time" className="task-time" required />
            </div>
                )
    }
}

export default NewTask;