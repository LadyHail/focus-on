import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLocalDate } from '../utils/dateTime.js';

class ObjDone extends Component {

    static propTypes = {
        obj: PropTypes.object.isRequired,
        time: PropTypes.object.isRequired
    }

    render() {
        const obj = this.props.obj;
        const time = this.props.time;
        return (
            <div className="goal-div failed">
                <p>I want to {obj.description}.</p>
                <p>I started {getLocalDate(obj.created)}.</p>
                <p>I wanted to finish until {getLocalDate(obj.expDate)}.</p>
                <p>The time ended {-time.days} days {-time.hours} hours {-time.minutes} minutes ago.</p>
            </div>
        )
    }
}

export default ObjDone;