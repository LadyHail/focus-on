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
            </div>
            )
    }
}

export default Home;