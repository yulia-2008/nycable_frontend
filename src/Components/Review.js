import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Review extends Component {
    render() {
        //  console.log("review",)
        // navlik need to be finished.
        return (
            <div>
                <b>{this.props.review.user.first_name} {this.props.review.user.last_name} </b>             
                 &nbsp; &nbsp; 
                {this.props.review.text} 
            </div>
        );
    }
}

export default Review;
