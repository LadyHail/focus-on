import React, { Component } from 'react';
import NewTask from './newGoal/NewTask.js';
import AddTask from './newGoal/AddTask.js';
import { getDate } from '../utils/dateTime.js';
import { saveGoal } from '../utils/dbHelper.js';
import { createGoalObj, createTasksObjs } from '../utils/utils.js';
import Notification from '../components/Notification.js';
import NotFound from '../components/NotFound.js';

class NewGoal extends Component {
    constructor(props) {
        super(props);
        this.id = 0;
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.goalDateChanged = this.goalDateChanged.bind(this);
        this.goalTimeChanged = this.goalTimeChanged.bind(this);
    }

    componentWillMount = () => {
        this.id++;
        this.setState({
            tasks: [<NewTask key={this.id} id={this.id} removeBtnClick={this.removeTask} goalDate={this.state.goalDate} goalTime={this.state.goalTime} />]
        });
    }

    state = {
        tasks: [],
        goalDate: new Date().toISOString().substring(0, 10),
        goalTime: new Date().toLocaleString().substring(12, 17),
        notify: false,
        isError: false
    }

    save = (e) => {
        e.preventDefault();
        const goal = createGoalObj();
        const tasksElements = document.getElementsByClassName('task');
        const tasks = createTasksObjs(tasksElements);
        if (goal !== null && tasks !== null) {
            goal.tasks = tasks;
            saveGoal("goal" + goal.id.toString(), goal);
            const form = document.getElementById('add-goal');
            form.reset();
            this.setState({ tasks: [<NewTask key={this.id} id={this.id} removeBtnClick={this.removeTask} goalDate={this.state.goalDate} goalTime={this.state.goalTime} />] });
            this.setState({ notify: true });
        } else {
            this.setState({ isError: true });
        }
    }  

    addTask = () => {
        if (this.state.tasks.length < 64) {
            this.id++;
            let newState = this.state.tasks;
            newState.push(<NewTask key={this.id} id={this.id} removeBtnClick={this.removeTask} goalDate={this.state.goalDate} goalTime={this.state.goalTime} />);
            this.setState({ tasks: newState });
            this.setState({ notify: false });
        }       
    }

    removeTask = (e) => {
        if (this.state.tasks.length > 1) {
            const id = e.target.getAttribute('data-id');
            const task = this.state.tasks.findIndex(t => t.props.id === id);
            let newState = this.state.tasks;
            newState.splice(task, 1);
            this.setState({ tasks: newState });
            this.setState({ notify: false });
        }        
    }

    goalDateChanged = (e) => {
        const date = e.target.value;
        this.setState({ goalDate: date});
        const newState = this.state.tasks.map(p => {
            return <NewTask key={p.key} id={p.props.id} removeBtnClick={p.props.removeBtnClick} goalDate={date} goalTime={this.state.goalTime} />
        });
        this.setState({ tasks: newState });
        this.setState({ notify: false });
    }

    goalTimeChanged = (e) => {
        const time = e.target.value;
        this.setState({ goalTime: time });
        const newState = this.state.tasks.map(p => {
            return <NewTask key={p.key} id={p.props.id} removeBtnClick={p.props.removeBtnClick} goalDate={this.state.goalDate} goalTime={time} />
        });
        this.setState({ tasks: newState });
        this.setState({ notify: false });
    }

    render = () => {

        return (
            <div>
                {this.state.isError ?
                    <NotFound />
                    :
                <div>
                    {this.state.notify ?
                            <Notification msg="Goal saved!" level="success" /> : null}
                        <form onSubmit={this.save} id="add-goal">
                            <div className="container">                                
                                <div className="input-container">
                                    <label>What I want to achieve?<input type="text" placeholder="eg. Learn Web Development" required id="goal-desc" className="description" maxLength="250" /></label>
                                    <label>I want to achieve my goal until: <input type="date" required id="goal-date" min={getDate()} onChange={this.goalDateChanged} /></label>
                                    <input type="time" required defaultValue={this.state.goalTime} id="goal-time" onChange={this.goalTimeChanged} />
                                </div>
                                
                            
                                <div className="input-container">
                                    {this.state.tasks}
                                </div>
                            </div>
                            <div className="btns-list">
                                <ul>
                                    <li><AddTask btnClick={this.addTask} /></li>
                                    <li><button type="submit" className="btn-success btn-save"><i className="fas fa-save fa-lg btn-img"></i>Set new goal!</button></li>
                                </ul>
                            </div>
                        </form>
                </div>
            }
            </div>
        );
    }
}

export default NewGoal;