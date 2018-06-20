import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { spentTime, getLocalDate } from '../utils/dateTime.js';

class ObjDone extends Component {

    static propTypes = {
        obj: PropTypes.object.isRequired
    }

    render() {
        const obj = this.props.obj;
        return (
            <div className="goal-div done">
                <div className="details">
                    <p>I achieved my goal: {obj.description}.</p>
                    <p>I started {getLocalDate(obj.created)}.</p>
                    <p>I finished {getLocalDate(obj.done)}.</p>
                    <p>I spent {spentTime(obj.created, obj.done).days} days {spentTime(obj.created, obj.done).hours} hours {spentTime(obj.created, obj.done).minutes} minutes.</p>
                </div>
                <div className="img">
                    <i className="fas fa-star fa-3x img-gold"></i>
                </div>
            </div>
            )
    }
}

export default ObjDone;