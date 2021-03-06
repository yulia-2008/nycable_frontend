import React, { Component } from 'react';
import Rating from 'material-ui-rating';
import Review from "../Components/Review";
import {NavLink} from 'react-router-dom';
import ArrowIcon from "../ArrowIcon.png";

class CompanyReviews extends Component {

    state = {
       review: "",
       newReview: null,
       clicked: false, 
       ratingValue: 0,
       ratingSubmited: false,
       alreadyRated: false
   }
    renderReviews = () => {
        if (this.state.newReview) {
            let updatedReviews = [...this.props.company.reviews, this.state.newReview];
            return updatedReviews.map(rev => <Review key={rev.id} review={rev} currentUser={this.props.currentUser} />)                  
        }
        else {
            return this.props.company.reviews.map (rev => <Review key={rev.id} review={rev} currentUser={this.props.currentUser} />)
        }       
    }

    componentDidMount() {
        // find if currentUser is already rated this company
        fetch(`https://nycable.herokuapp.com/companies/${this.props.company.id}/ratings`)
        .then(response => response.json())
        .then(response => {
                if (this.props.currentUser) {
                    
                    let ratingObject =  response.find((ratingObj) => ratingObj.user.id === this.props.currentUser.id) // ratingObj.user && ratingObj.user_id -  user who did rated
                    typeof ratingObject === 'object' ?  
                            this.setState({alreadyRated: ratingObject.num}) 
                            : 
                            this.setState({alreadyRated: false}) 
                    
                    }           
    })
}

    ratingChangeHandler = val => {
        this.setState({ratingValue: val})
    } 

    changeHandler = event => { 
        this.setState({review: event.target.value})
    }
    
    submitReview = () => { 
        // optimistic rendering
        this.setState({
            review: "",
            newReview: {text: this.state.review,  
                        object_id: this.props.company.id, 
                        user: {
                            first_name: this.props.currentUser.first_name,
                            last_name: this.props.currentUser.last_name
                         }}
        })
    this.props.submitReview(this.props.company.id, this.state.review)      
    }

    submitRating = () => {
        this.props.submitRating(this.state.ratingValue, this.props.company)
        this.setState({ratingSubmited: true})
    }


    render() {
            //  console.log("company reviews", this.state.review )
        return (
            <>
            <NavLink  to='/providers'><span> <img id ="arrow" src={ArrowIcon} alt="icon"></img> Back to Providers</span> </NavLink>
            <div id="reviews-container"> 
              
                <img id="logo" src={this.props.company.logo} alt={this.props.company.name}></img> <br/>

                {this.props.currentUser?                  
                    <>
                        { this.state.alreadyRated ?           // check if current user already rated this company 
                            null
                            :        
                            this.state.ratingSubmited ? 
                                <p>Thank you for rating</p> 
                                :                                                                   
                                <div id="flex"> 
                                <p>Rate:</p>                                           
                                <Rating value={this.state.ratingValue}                                 
                                        size="large"
                                        onChange = { (value) => this.ratingChangeHandler(value)}/> 
                                <button id="submit" onClick={this.submitRating}>Submit</button>
                                </div>                              
                        }
                        <br/> 
                        <textarea type="text"  name="review" rows="4"
                                    placeholder = "Leave a review"
                                    value={this.state.review}
                                    onChange={this.changeHandler}>                           
                        </textarea> <br/>
                        <button id="submit" onClick={this.submitReview}>Submit</button>                                 
                    </>                                                  
                    :          // you are not logged in
                    <p id="red"> Want to rate this company <br/> or leave a review? 
                        <NavLink  to='/signup'><span>  Login </span> </NavLink>
                    </p>
                }
                
                <div id="left-align">               
                    {this.renderReviews()}
                </div>
            </div>
            </>
        );
    }
}

export default CompanyReviews;
