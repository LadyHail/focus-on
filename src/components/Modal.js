import React, { Component } from 'react';

class Modal extends Component {

    componentWillMount = () => {
        this.showHide = this.props.show ? 'modal display-block' : 'modal display-none';
    }

    componentWillReceiveProps = () => {
        this.showHide = this.props.show ? 'modal display-block' : 'modal display-none';
    }

    render() {
        return (
            <div className={this.showHide}>
                <section className="modal-main">
                    {this.props.children}
                </section>
            </div>
            )
    }
}

export default Modal;