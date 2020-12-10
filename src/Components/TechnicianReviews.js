import React, { Component } from 'react';
import Review from "./Review";
import Rating from 'material-ui-rating'
import Avatar from "../Avatar.jpg";
import {Image} from 'cloudinary-react';
import {NavLink} from 'react-router-dom';
import ArrowIcon from "../ArrowIcon.png";

class TechnicianReviews extends Component {
    state = {
        review: "",
        reviews: [],
        clicked: false, 
        ratingValue: 0,
        ratingSubmited: false
    }

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
                            }); this.props.submitReview(this.props.user, response)
                          }

        )        
    }

    componentDidMount(){ 
        // find id for technician or currentUser  
        let id; 
        if (this.props.user){id = this.props.user.id}
        else {id = this.props.currentUser.id}


            fetch(`http://localhost:4000/technicians/${id}/reviews`)
            .then(response => response.json())
            .then(response => this.setState({reviews: response
            })
            )             
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
            <div id="review-container"> 
                <NavLink  to='/' ><span> <img id ="arrow" src={ArrowIcon} alt="icon"></img> Back to technicians</span> </NavLink> <br></br>  
                <div id="user-card">               
                    <h2 id ="no-margin">{this.props.user.first_name} {this.props.user.last_name}</h2>                  
                        {this.props.user.photo ? 
                            <Image cloudName="dytr9lvlc" 
                                    publicId={this.props.user.photo} 
                                    width="50" height= "50" 
                                    crop="pad"   radius="20" />
                            :
                            <img id="photo-profile" src={Avatar}></img>                    
                        }
                    <br></br>                 
                </div>          
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
                            <textarea type="text"  rows="4"
                                        placeholder = "Login to leave a review"
                                        value = "Login to leave a review">                           
                            </textarea> 
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
 
