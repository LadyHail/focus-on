import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RemoveTask extends Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        btnClick: PropTypes.func.isRequired
    }

    render = () => {
        return (
            <button type="button" onClick={this.props.btnClick} data-id={this.props.id} className="btn-fail"><i className="fas fa-minus fa-lg btn-img"></i>Delete task</button>
        )
    }
}

export default RemoveTask;