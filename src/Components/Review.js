import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Review extends Component {
    render() {
        //  console.log(this.props.review)
        return (
            <div>
             <NavLink to={this.props.currentUser && this.props.currentUser.id === this.props.review.user_id ?
                 '/profile' :
                 `/user/${this.props.review.user_id}`} >
                <span onClick={() => this.props.clickHandler(this.props.review.user)}> 
                       {this.props.review.user.first_name} {this.props.review.user.last_name} &nbsp;
                </span>
               </NavLink>
                &nbsp; 
                   {this.props.review.text}               
            </div>
        );
    }
}

export default Review;
