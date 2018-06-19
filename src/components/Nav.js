import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><Link to="/">Focus on... </Link></li>
                    <li><Link to="/goal/new">Set new goal</Link></li>
                    <li><Link to="/goals">Goals</Link></li>
                </ul> 
            </nav>
            )
    }
}

export default Nav;