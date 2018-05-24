import React, { Component } from 'react';
import './index.css';
import NewGoal from '../NewGoal/index.js';
import ShowGoalsList from '../ShowGoalsList/index.js';

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
