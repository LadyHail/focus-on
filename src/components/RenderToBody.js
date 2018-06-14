import { Component } from 'react';
import ReactDOM from 'react-dom';

class RenderToBody extends Component {

    componentDidMount = () => {
        if (document.getElementById('popup')) {
            this.popup = document.getElementById('popup');
            ReactDOM.unmountComponentAtNode(this.popup);
            document.body.removeChild(this.popup);
        }
        this.popup = document.createElement('div');
        this.popup.id = "popup";
        document.body.appendChild(this.popup);
        this._renderLayer();
    };

    componentDidUpdate = () => {
        this._renderLayer();
    };

    componentWillUnmount = () => {
        //ReactDOM.unmountComponentAtNode(this.popup);
        //document.body.removeChild(this.popup);
    };

    _renderLayer = () => {
        ReactDOM.render(this.props.children, this.popup);
    }

    render = () => {
        return null;        
    }
}

export default RenderToBody;