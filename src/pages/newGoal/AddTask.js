import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTask extends Component {

    static propTypes = {
        btnClick: PropTypes.func.isRequired
    }

    render = () => {
        return (
            <button type="button" onClick={this.props.btnClick} className="btn-success"><i className="fas fa-plus fa-lg btn-img"></i>Set new task</button>
            )
    }
}

export default AddTask;