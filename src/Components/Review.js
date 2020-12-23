import React, { Component } from 'react';


class Review extends Component {
    render() {
        //  console.log("review",)
        return (
            <p>
                <b>{this.props.review.user.first_name} {this.props.review.user.last_name} </b>             
                 &nbsp; &nbsp; 
                {this.props.review.text} 
            </p>
        );
    }
}

export default Review;
