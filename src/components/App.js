import React, { Component } from 'react';
import './app.css';
import NewGoal from '../pages/NewGoal.js';
import ShowGoalsList from '../pages/ShowGoalsList.js';

class App extends Component {
  render() {
    return (
        <main>
            <button>Set new goal</button>
            <div>
                <NewGoal />
            </div>
            <div>
                <ShowGoalsList />
            </div>
        </main>
    );
  }
}

export default App;
