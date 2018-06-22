import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLocalDate } from '../utils/dateTime.js';

class ObjDone extends Component {

    static propTypes = {
        obj: PropTypes.object.isRequired,
        time: PropTypes.object.isRequired
    }

    shouldComponentUpdate = () => {
        return true;
    }

    render() {
        const obj = this.props.obj;
        const time = this.props.time;
        return (
            <div className="goal-div failed">
                <div className="details">
                    <p>I want to {obj.description}.</p>
                    <p>I started {getLocalDate(obj.created)}.</p>
                    <p>I wanted to finish until {getLocalDate(obj.expDate)}.</p>
                    <p>The time ended {time.days} days {time.hours} hours {time.minutes} minutes {time.seconds} seconds ago.</p>
                </div>
                <div className="img">
                    <i className="fas fa-clock fa-3x img-red"></i>
                </div>
            </div>
        )
    }
}

export default ObjDone;