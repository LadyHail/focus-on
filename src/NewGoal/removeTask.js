import React, { Component } from 'react';

class RemoveTask extends Component {
    render = () => {
        return (
            <button type="button" onClick={this.props.btnClick} data-id={this.props.id}>Remove task</button>
        )
    }
}

export default RemoveTask;