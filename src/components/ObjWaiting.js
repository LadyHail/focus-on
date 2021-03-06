﻿import React, { Component } from 'react';
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
            <div className="goal-div waiting">
                <div className="details">
                    <p>I want to {obj.description}.</p>
                    <p>I started {getLocalDate(obj.created)}.</p>
                    <p>I want to finish until {getLocalDate(obj.expDate)}.</p>
                    <p>I still have {time.days} days {time.hours} hours {time.minutes} minutes {time.seconds} seconds left.</p>
                </div>
                <div className="img">
                    <i className="fas fa-angle-double-up fa-4x img-green"></i>
                </div>
            </div>
        )
    }
}

export default ObjDone;