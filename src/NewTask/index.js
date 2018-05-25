import React, { Component } from 'react';

class NewTask extends Component {

    render = () => {
        return (
            <div className="task">
                <input type="text" placeholder="How to achieve my goal?" required data-id={this.props.id}/>
                <input type="date" data-id={this.props.id}/>
            </div>
                )
    }
}

export default NewTask;