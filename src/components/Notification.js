import React from 'react';
import NotificationSystem from 'react-notification-system';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this._notificationSystem = null;
        this._addNotification = this._addNotification.bind(this);
    };

    _addNotification(msg, level) {
        this._notificationSystem.clearNotifications();
        this._notificationSystem.addNotification({
            message: msg,
            level: level,
            position: 'tr'
        });
    };

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
        this._addNotification(this.props.msg, this.props.level);
    };

    shouldComponentUpdate(nextProps) {
        if (this._notificationSystem) {
            this._addNotification(nextProps.msg, nextProps.level);
        }
        return false;
    }

    render() {
        return (
            <div>                
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    };
};

export default Notification;