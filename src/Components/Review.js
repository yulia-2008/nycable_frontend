import React, { Component } from 'react';

class Review extends Component {
    render() {
        return (
            <div>
                {this.props.review.text} <br></br>
            </div>
        );
    }
}

export default Review;
