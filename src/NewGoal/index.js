import React, { Component } from 'react';

class NewGoal extends Component {

    save = (e) => {
        e.preventDefault();
        const description = e.target[0].value;
        const date = e.target[1].value;
        const id = Object.keys(window.localStorage).length + 1;
        const goal = { 'id': id, 'description': description, 'date': date };
        window.localStorage.setItem("goal" + id.toString(), JSON.stringify(goal));
        const form = document.getElementById('add-goal');
        form.reset();
    }

    render = () => {
        return (
            <form onSubmit={this.save} id="add-goal">
                <input type="text" placeholder="What do you want to achieve?" required />
                <input type="date" required />
                <button type="submit">Save</button>
            </form>
            )
    }
}

export default NewGoal;