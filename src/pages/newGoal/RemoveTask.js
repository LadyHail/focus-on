import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RemoveTask extends Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        btnClick: PropTypes.func.isRequired
    }

    render = () => {
        return (
            <button type="button" onClick={this.props.btnClick} data-id={this.props.id}>Remove task</button>
        )
    }
}

export default RemoveTask;