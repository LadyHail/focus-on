import React, { Component } from 'react';

class AddTask extends Component {
    render = () => {
        return (
            <button type="button" onClick={this.props.btnClick}>Set new task</button>
            )
    }
}

export default AddTask;