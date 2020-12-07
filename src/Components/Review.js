import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Review extends Component {
    render() {
        //  console.log("review",)
        // navlik need to be finished.
        return (
            <div>
                {this.props.review.user.first_name} {this.props.review.user.last_name}              
                 &nbsp; &nbsp; 
                {this.props.review.text} 
            </div>
        );
    }
}

export default Review;
