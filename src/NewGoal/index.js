import React, { Component } from 'react';
import NewTask from '../NewTask/index.js';
import AddTask from './addTask.js';

//TODO tasks exp date cannot be further than goals
class NewGoal extends Component {
    constructor(props) {
        super(props);
        this.id = 0;
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    componentWillMount = () => {
        this.id++;
        this.setState({
            tasks: [<NewTask key={this.id} id={this.id} removeBtnClick={this.removeTask} />]
        });
    }

    state = {
        tasks: []
    }

    save = (e) => {
        e.preventDefault();
        const description = document.getElementById('goal-desc').value;
        let expDate = document.getElementById('goal-date').value + ' ' + document.getElementById('goal-time').value;
        expDate = new Date(expDate).toUTCString();
        const id = Object.keys(window.localStorage).length + 1;
        const tasksElements = e.target.getElementsByClassName('task');
        let tasks = [];
        const dateNow = new Date().toUTCString();
        for (let item of tasksElements) {
            const taskDate = item.getElementsByClassName('task-date')[0].value;
            const taskTime = item.getElementsByClassName('task-time')[0].value;
            let taskExpDate = taskDate + ' ' + taskTime;
            taskExpDate = new Date(taskExpDate).toUTCString();
            const task = {
                'id': item.getAttribute('data-id'),
                'description': item.getElementsByClassName('task-desc')[0].value,
                'expDate': taskExpDate,
                'created': dateNow
            }
            tasks.push(task);
        }

        const goal = { 'id': id, 'description': description, 'expDate': expDate, 'created': dateNow, 'tasks': tasks };

        window.localStorage.setItem("goal" + id.toString(), JSON.stringify(goal));
        const form = document.getElementById('add-goal');
        form.reset();
        this.setState({ tasks: [<NewTask key={this.id} id={this.id} removeBtnClick={this.removeTask} />] });
    }

    addTask = () => {
        this.id++;
        let newState = this.state.tasks;
        newState.push(<NewTask key={this.id} id={this.id} removeBtnClick={this.removeTask} />);
        this.setState({ tasks: newState });
    }

    //TODO delete only if tasks > 1
    removeTask = (e) => {
        const id = e.target.getAttribute('data-id');
        const task = this.state.tasks.findIndex(t => t.props.id == id);
        let newState = this.state.tasks;
        newState.splice(task, 1);
        this.setState({ tasks: newState });
    }

    render = () => {

        return (
            <form onSubmit={this.save} id="add-goal">
                <input type="text" placeholder="What do I want to achieve?" required id="goal-desc"/>
                <input type="date" required id="goal-date" min={new Date().toISOString().substring(0, 10)} />
                <input type="time" required defaultValue="23:59" id="goal-time"/>
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