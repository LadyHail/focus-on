import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './app.css';
import Routing from '../components/Routing.js';

class App extends Component {
  render() {
    return (
        <main>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/goal/new">Set new goal</Link></li>
                <li><Link to="/goals">Goals</Link></li>           
            </ul>
            <Routing />
        </main>
    );
  }
}

export default App;
