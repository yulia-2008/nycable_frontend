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
        fetch('https://nycable.herokuapp.com/reviews', options)
        .then(response => response.json())
        .then(response => { this.setState({
                                review: "", 
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

            fetch(`https://nycable.herokuapp.com/technicians/${id}/reviews`)
            .then(response => response.json())
            .then(response => this.setState({reviews: response
            })
            )             
    }

    
    renderReviews = () => {  
        return  this.state.reviews !==[] ?
            this.state.reviews.map(rev => <Review key={rev.id} review={rev} 
                                                  currentUser={this.props.currentUser}                 
                                                  user={this.props.user}/>)           
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
        let ratingObject =  this.props.user.ratings.find((ratingObj) => ratingObj.user_id === this.props.currentUser.id) // ratingObj.user_id - user who did rated
        typeof ratingObject === 'object' ?   rated = ratingObject.num : rated =  false 
        return rated
    }


    render() {
                //  console.log("techn.rev",this.props.user )        
    return (
        
    this.props.user ?  // current user is not on his profile page
        <> 
        <NavLink  to='/technicians' ><span> <img id ="arrow" src={ArrowIcon} alt="icon"></img> Back to technicians</span> </NavLink>  
            <div id="reviews-container">            
                
                <div>               
                    <h2 id ="no-margin">{this.props.user.first_name} {this.props.user.last_name}</h2>                  
                        {this.props.user.photo ? 
                            <Image cloudName="hkkxkj5mz" 
                                    publicId={this.props.user.photo} 
                                    width="200" height= "200" 
                                    crop="pad"   radius="20" />
                            :
                            <img id="photo-profile" src={Avatar}></img>                    
                        }
                    <br></br>                 
                </div>          
                {this.props.currentUser?                  
                    <>
                        { this.alreadyRated() ?           // check if current user already rated this technician 
                            null
                            :        
                            this.state.ratingSubmited ? 
                                <p>Thank you for rating</p> 
                                :                                                                   
                                <div id="flex"> 
                                    <p id="rating-centered"></p>                                           
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
                    <p id="red"> Want to rate this technician <br/> or leave a review? 
                    <NavLink  to='/signup'><span> Login </span> </NavLink>
                    </p>
                }
                <br/>
                <div id="left-align">
                    {this.renderReviews()}                   
                </div>
            </div>
        </>
        :                      // current user on his profile page
        <div id="left-align">
            {this.renderReviews()} 
        </div>                   
    );
    }
}

export default TechnicianReviews;
 
