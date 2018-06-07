import React, { Component } from 'react';
import NewTask from './NewTask.js';
import AddTask from './newGoal/AddTask.js';
import { getDate } from '../utils/DateTime.js';
import { saveGoal, findFreeId } from '../utils/DbHelper.js';
import { createGoalObj, createTasksObjs } from '../utils/utils.js';

class NewGoal extends Component {
    constructor(props) {
        super(props);
        this.id = 0;
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.goalDateChanged = this.goalDateChanged.bind(this);
    }

    componentWillMount = () => {
        this.id++;
        this.setState({
            tasks: [<NewTask key={this.id} id={this.id} removeBtnClick={this.removeTask} goalDate={this.state.goalDate} />]
        });
    }

    state = {
        tasks: [],
        goalDate: new Date().toISOString().substring(0, 10)
    }

    save = (e) => {
        e.preventDefault();
        const goal = createGoalObj();
        const tasksElements = document.getElementsByClassName('task');
        const tasks = createTasksObjs(tasksElements);
        goal.tasks = tasks;
        saveGoal("goal" + goal.id.toString(), JSON.stringify(goal));

        const form = document.getElementById('add-goal');
        form.reset();
        this.setState({ tasks: [<NewTask key={this.id} id={this.id} removeBtnClick={this.removeTask} goalDate={this.state.goalDate} />] });
    }

    

    addTask = () => {
        if (this.state.tasks.length < 64) {
            this.id++;
            let newState = this.state.tasks;
            newState.push(<NewTask key={this.id} id={this.id} removeBtnClick={this.removeTask} goalDate={this.state.goalDate} />);
            this.setState({ tasks: newState });
        }       
    }

    removeTask = (e) => {
        if (this.state.tasks.length > 1) {
            const id = e.target.getAttribute('data-id');
            const task = this.state.tasks.findIndex(t => t.props.id == id);
            let newState = this.state.tasks;
            newState.splice(task, 1);
            this.setState({ tasks: newState });
        }        
    }

    goalDateChanged = (e) => {
        const date = e.target.value;
        this.setState({ goalDate: date});
        const _this = this;
        const newState = this.state.tasks.map(p => {
            return <NewTask key={p.key} id={p.props.id} removeBtnClick={p.props.removeBtnClick} goalDate={date} />
        });
        this.setState({ tasks: newState });
    }

    render = () => {

        return (
            <form onSubmit={this.save} id="add-goal">
                <input type="text" placeholder="What do I want to achieve?" required id="goal-desc" />
                <input type="date" required id="goal-date" min={getDate()} onChange={this.goalDateChanged} />
                <input type="time" required defaultValue="23:59" id="goal-time" />
                <AddTask btnClick={this.addTask} />
                <div>
                    {this.state.tasks}
                </div>
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default NewGoal;