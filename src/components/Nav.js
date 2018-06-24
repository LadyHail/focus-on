import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { goalsCompleted } from '../utils/dbHelper.js';

class Nav extends Component {

    render() {
        return (
            <nav>
                <ul>
                    <li><Link to="/">Focus on... </Link></li>
                    <li><Link to="/goal/new">Set new goal</Link></li>
                    <li><Link to="/goals">Goals</Link></li>
                    <li title="Goals completed"><i className="fas fa-trophy fa-lg btn-img"></i>{goalsCompleted()}</li>
                </ul> 
            </nav>
            )
    }
}

export default Nav;