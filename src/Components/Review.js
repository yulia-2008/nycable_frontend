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
               
                {/* { this.props.currentUser?
                    this.props.user && this.props.currentUser.id === this.props.user_id ?
                        <>
                            <NavLink to={`/profile/review/user/${this.props.review.user.id}`}>               
                            {this.props.review.user.first_name} {this.props.review.user.last_name} 
                            </NavLink>             
                            &nbsp; &nbsp; 
                            {this.props.review.text} 
                        </>
                        :                       
                        <>
                            {this.props.review.user.first_name} {this.props.review.user.last_name}              
                             &nbsp; &nbsp; 
                            {this.props.review.text} 
                        </>

                :
                    this.props.company?
                    <>
                        {this.props.review.user.first_name} {this.props.review.user.last_name}              
                        &nbsp; &nbsp; 
                        {this.props.review.text} 
                    </>
                    :
                    ""
                
                }    */}
            </div>


            
            // <div>
            //  <NavLink to={this.props.currentUser && this.props.currentUser.id === this.props.review.user_id ?
            //      '/profile' :
            //      `/user/${this.props.review.user_id}`} >
            //     <span onClick={() => this.props.clickHandler(this.props.review.user)}> 
            //            {this.props.review.user.first_name} {this.props.review.user.last_name} &nbsp;
            //     </span>
            //    </NavLink>
            //     &nbsp; 
            //        {this.props.review.text}               
            // </div>
        );
    }
}

export default Review;
