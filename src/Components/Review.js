import React, { Component } from 'react';

class Review extends Component {
    render() {
        return (
            <div>
               <h5> {this.props.review.user.first_name} &nbsp;  {this.props.review.user.last_name} : &nbsp; 
                  <span> {this.props.review.text}</span>
               </h5>
            </div>
        );
    }
}

export default Review;
