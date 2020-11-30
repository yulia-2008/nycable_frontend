import React, { Component } from 'react';
import Review from "../Components/Review";
import Rating from 'material-ui-rating'
import { Route, Switch} from 'react-router-dom';

class TechnicianReviews extends Component {
    state = {
         review: "",
        // review: null,
        reviews: [],
        clicked: false, 
        ratingValue: 0,
        ratingSubmited: false
    }

    // getReviews = () => {  
    //     if(this.props.currentUser)  
    //     {return this.props.currentUser.reviews.map(rev => <Review id={rev.id} review={rev} />)}

    //     if(this.props.technician)  
    //     {return this.props.technician.reviews.map(rev => <Review id={rev.id} review={rev} />)}
    // }

    changeHandler = event => { this.setState({review: event.target.value})
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
                                     object_id: this.props.user.id,
                                     object_type: "User",
                                     user_id: this.props.currentUser.id
                                   }
                         })
                       }
        fetch('http://localhost:4000/reviews', options)
        .then(response => response.json())
        .then(response => { this.setState({
                                clicked: !this.state.clicked, 
                                reviews: [...this.state.reviews, response]
                            })
                          }

        )        
    }


    // componentDidMount(){ 
    //     let id;
    //     this.props.user?   id = this.props.user.id :  id=this.props.currentUser.id    
    //         fetch(`http://localhost:4000/technicians/${id}/reviews`)
    //         .then(response => response.json())
    //         .then(response => this.setState({reviews: response
    //                       })
    //         )
    // }
    componentDidMount(){   
            fetch(`http://localhost:4000/reviews`)
            .then(response => response.json())
            .then(response => { 
                if (this.props.user){  
                         // find reviews for technician            
                    let filtered = response.filter(rev => this.props.user.id === rev.review_object.id)                 
                    this.setState({
                        reviews: filtered
                    })
                }  

                else { 
                           // find reviews for current user
                    let filtered = response.filter(rev => rev.review_object.role && this.props.currentUser.id === rev.review_object.id )                 
                    this.setState({
                        reviews: filtered
                    })
                    console.log("Else1", filtered)
                }  
            })
    }

    
    renderReviews = () => {  
        return  this.state.reviews !==[] ?
            this.state.reviews.map(rev => <Review key={rev.id} review={rev} 
                                                  currentUser={this.props.currentUser}                 
                                                  user={this.props.user}                   // maybe need later for link
                                                                        // clickHandler={this.props.clickHandler} 
                                                                        />)           
            :
            null                                                                
    }

    
    ratingChangeHandler = val => {
        this.setState({ratingValue: val})
    }

    submitRating = () => {
        this.props.submitRating(this.state.ratingValue, this.props.user)
        this.setState({ratingSubmited: true})
    }

    alreadyRated = () => {
        let rated = null
        let ratingObject =  this.props.user.ratings.find((ratingObj) => ratingObj.user_id === this.props.currentUser.id)
        typeof ratingObject === 'object' ?   rated = ratingObject.num : rated =  false 
        return rated
    }


    render() {
                // console.log("rev-cont",this.props.currentUser.reviews )
        
    return (
        
    this.props.user ?  // current user is not on his profile page
        this.props.user.role === "customer" ? null:
            <div id="review-container">             
                {this.props.currentUser?                  
                        <>
                        { this.alreadyRated() ?           // check if current user already rated this technician 
                            <p id ="no-margin">You have rated this technitian as  {this.alreadyRated()}</p>
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
                <br/>
                <h2>Reviews</h2>
                {this.renderReviews()} 
                 </div>
    :                      // current user on his profile page
    <>
    <h2>Reviews</h2>
    {this.renderReviews()} 
    </>        
           
        );
    }
}

export default TechnicianReviews;
 
