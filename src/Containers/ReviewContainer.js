import React, { Component } from 'react';
import Review from "../Components/Review";
import Rating from 'material-ui-rating'

class ReviewContainer extends Component {
    state = {
        reviews: [],
        review: null,
        clicked: false, 
        ratingValue: 0
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

     submitHandler = () => { 
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
        .then(response => {console.log("resp", response); this.setState({
                                clicked: !this.state.clicked, 
                                reviews: [...this.state.reviews, response]
                            })
                          }

        )        
     }


    componentDidMount(){ 
        let id;
        this.props.user?   id = this.props.user.id :  id=this.props.currentUser.id    
            fetch(`http://localhost:4000/technicians/${id}/reviews`)
            .then(response => response.json())
            .then(response => this.setState({reviews: response
                          })
            )
    }

    renderReviews = () => { 
        if(this.state.reviews !==[])  
        {return this.state.reviews.map(rev => <Review  review={rev} />)}

    }
    
    ratingChangeHandler = val => {
        this.setState({ratingValue: val})
    }

    submitRating = () => {
        this.props.submitRating(this.state.ratingValue)
    }


    render() {
        //  console.log("rev- current user id",this.props.currentUser.id )
        
        return (
            <div id="review-container">
                {this.props.currentUser?  
                    this.props.user?  // current user is not on his profile page 
                        <>
                        <p id="no-margin">Rate:</p>
                        <div id="rating-flex">                           
                            <Rating value={this.state.ratingValue}  
                                precision={0.5}  size="large"
                                onChange = { (value) => this.ratingChangeHandler(value)}/> 
                            <button id="small-button" onClick={this.submitRating}>Submit</button>
                        </div> 
                        <br/> 
                        <button onClick={this.clickHandler}>Leave a review</button>  <br></br>                                                                                  
                            {this.state.clicked ?
                                <>
                                <textarea type="text"  name="review" rows="4"
                                          placeholder = "Enter your text"
                                          onChange={this.changeHandler}>                           
                                </textarea>
                                <button onClick={this.submitHandler}>Submit</button> 
                                </>
                                :
                                null
                            }
                        </>
                    :null  //current user is on his profile page                                                     
                :          // you are not logged in
                    <>
                    <button onClick={this.clickHandler}>Leave a review</button><br></br>
                        {this.state.clicked ?
                                <>
                                <textarea type="text"  rows="4"
                                          placeholder = "Login to leave a review"
                                          value = "Login to leave a review">                           
                                </textarea>
                                <button>Submit</button> 
                                 </> 
                                 :
                                 null
                        }                             
                        </>
                }
                {this.renderReviews()}  
            </div>
        );
    }
}

export default ReviewContainer;
 
