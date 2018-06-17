import React, { Component } from 'react';
import { getLocalDate } from '../utils/dateTime.js';

class ObjDone extends Component {
    render() {
        const obj = this.props.obj;
        const time = this.props.time;
        return (
            <div>
                <p>I want to {obj.description}.</p>
                <p>I started {getLocalDate(obj.created)}.</p>
                <p>I want to finish until {getLocalDate(obj.expDate)}.</p>
                <p>I set {obj.tasks.length} tasks.</p>
                <p>I still have {time.days} days {time.hours} hours {time.minutes} minutes left.</p>
            </div>
        )
    }
}

export default ObjDone;