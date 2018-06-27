import React, { Component } from 'react';
import { getRandomQuote } from '../utils/quotesDbHelper.js';

class Home extends Component {

    componentWillMount() {
        this.quote = getRandomQuote();
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h3>{this.quote.Text}</h3>
                    <h4>{this.quote.Author}</h4>
                </div>

                <div className="container">
                    <p>The application helps you to manage time so you can stay focused on your personal goals.</p> 
                    <p>Users data is stored in a local storage in a browser.</p>
                    <p>Once set goal can't be deleted. It's by design. If you really need to delete the goal you can do it by accessing local storage of your browser.</p>
                </div>

                <div className="container">
                    <p>Follow me on <a href="https://github.com/LadyHail/focus-on">GitHub <i className="fab fa-github fa-lg btn-img"></i></a></p>
                </div>
            </div>
            )
    }
}

export default Home;