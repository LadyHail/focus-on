import React, { Component } from 'react';
import NewTask from '../NewTask/index.js';
import AddTask from './addTask.js';

class NewGoal extends Component {
    constructor(props) {
        super(props);
        this.id = 0;
        this.addTask = this.addTask.bind(this);
    }

    componentWillMount = () => {
        this.id++;
        this.setState({
            tasks: [<NewTask key={this.id} id={this.id}/>] });
    }

    state = {
        tasks: []
    }

    save = (e) => {
        e.preventDefault();
        const description = e.target[0].value;
        const date = e.target[1].value;
        const id = Object.keys(window.localStorage).length + 1;
        const tasksElements = e.target.getElementsByClassName('task');
        let tasks = [];
        //TODO change date format
        const dateNow = new Date().toISOString().slice(0, 10);
        for (let item of tasksElements) {
            const task = {
                'id': item.children[0].getAttribute('data-id'),
                'description': item.children[0].value,
                'expDate': e.target[1].value,
                'created': dateNow
            }
            tasks.push(task);
        }

        const goal = { 'id': id, 'description': description, 'expDate': date, 'created': dateNow, 'tasks': tasks };

        window.localStorage.setItem("goal" + id.toString(), JSON.stringify(goal));
        const form = document.getElementById('add-goal');
        form.reset();
        this.setState({ tasks: [<NewTask key={this.id} id={this.id} />] });
    }

    addTask = () => {
        this.id++;
        let newState = this.state.tasks;
        newState.push(<NewTask key={this.id} id={this.id} />);
        this.setState({ tasks: newState });
    }

    removeTask = () => {
        //TODO
    }

    render = () => {

        return (
            <form onSubmit={this.save} id="add-goal">
                <input type="text" placeholder="What do I want to achieve?" required />
                <input type="date" required />
                <AddTask btnClick={this.addTask} />
                <div>
                    {this.state.tasks}
                </div>
                <button type="submit">Save</button>
            </form>
            )
    }
}

export default NewGoal;