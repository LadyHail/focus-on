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
                    <button onClick={this.props.closeModal} className="btn-success">I did it!</button>
                </section>
            </div>
            )
    }
}

export default Modal;