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
        fetch(`http://localhost:4000/companies/${this.props.company.id}/ratings`)
        .then(response => response.json())
        .then(response => {
     
                let ratingObject =  response.find((ratingObj) => ratingObj.user.id === this.props.currentUser.id) // ratingObj.user && ratingObj.user_id -  user who did rated
                typeof ratingObject === 'object' ?  
                     this.setState({alreadyRated: ratingObject.num}) 
                     : this.setState({alreadyRated: false})         
    })
}

    ratingChangeHandler = val => {
        this.setState({ratingValue: val})
    } 

    changeHandler = event => { 
        this.setState({review: event.target.value})
    }
    clickHandler = () => { this.setState({clicked: !this.state.clicked})
    }


    submitReview = () => { 
        let options = { method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                         Accept: 'application/json'
                        },
                         body: JSON.stringify({
                           review: { text: this.state.review,
                                     object_id: this.props.company.id,
                                     object_type: "Company",
                                     user_id: this.props.currentUser.id
                                   }
                         })
                       }
        fetch('http://localhost:4000/reviews', options)
        .then(response => response.json())
        .then(response => { this.setState({
                                clicked: !this.state.clicked, 
                                newReview: response
                            })
                          }
        )        
    }

    submitRating = () => {
        this.props.submitRating(this.state.ratingValue, this.props.company)
        this.setState({ratingSubmited: true})
    }


    render() {
        //    console.log("company reviews", this.props.company.ratings )
        //    console.log("company reviews", this.props.currentUser.id )
        return (
            <div>
                <NavLink  to='/'><span> <img id ="arrow" src={ArrowIcon} alt="icon"></img> Back to Companies</span> </NavLink>
              
                <h1>{this.props.company.name}</h1>
                {this.props.currentUser?                  
                        <>
                        { this.state.alreadyRated ?           // check if current user already rated this company 
                            <p id ="no-margin">You have rated this company as  {this.state.alreadyRated}</p>
                            :        
                            this.state.ratingSubmited ? 
                                <p>Thank you for rating</p> 
                                :                                                                   
                                <div id="flex"> 
                                <p id="rating-centered">Rate:</p>                                           
                                <Rating value={this.state.ratingValue}                                 
                                        size="large"
                                        onChange = { (value) => this.ratingChangeHandler(value)}/> 
                                <button id="small-button" onClick={this.submitRating}>Submit</button>
                                </div>                              
                        }
                        <br/> 
                        <button onClick={this.clickHandler}>Leave a review</button>  <br></br>                                                                                  
                        {this.state.clicked ?
                                <>
                                <textarea type="text"  name="review" rows="4"
                                          placeholder = "Enter your text"
                                          onChange={this.changeHandler}>                           
                                </textarea>
                                <button onClick={this.submitReview}>Submit</button> 
                                </>
                                :
                                null
                        }
                        </>                                                  
                :          // you are not logged in
                    <>
                    <button onClick={this.clickHandler}>Leave a review</button><br></br>
                        {this.state.clicked ?
                                <>
                                <textarea type="text"  rows="4"
                                          placeholder = "Login to leave a review"
                                          value = "Login to leave a review">                           
                                </textarea>
                                {/* <button>Submit</button>  */}
                                 </> 
                                 :
                                 null
                        }                             
                    </>
                }
                <br></br>
                {this.renderReviews()}

            </div>
        );
    }
}

export default CompanyReviews;
