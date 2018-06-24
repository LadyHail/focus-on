import React, { Component } from 'react';
import ErrorImg from '../img/notFound.jpg';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div className="error-page">
                <Link to="/"><button className="btn btn-success"><i className="fas fa-arrow-left fa-lg btn-img"></i>Go home!</button></Link>
                <img src={ErrorImg} className="img-error" alt="404 Error - The page doesn't exist. Designed by Bamdewanto / Freepik" title="Designed by Bamdewanto / Freepik" />
            </div>
            )
    }
}

export default NotFound;