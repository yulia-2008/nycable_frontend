import React, { Component } from 'react';
import Review from "../Components/Review";

class ReviewContainer extends Component {
    state = {
        reviews: [],
        review: null,
        clicked: false
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


    componentDidMount(){         
            fetch(`http://localhost:4000/technicians/${this.props.user.id}/reviews`)
            .then(response => response.json())
            .then(response => this.setState({reviews: response
                          })
            )
    }

    renderReviews = () => { 
        if(this.state.reviews !==[])  
        {return this.state.reviews.map(rev => <Review  review={rev} />)}

    }
        

    render() {console.log("rev", this.state.reviews)
        return (
            <div id="review-container">
                {this.state.clicked?
                    <>
                    <textarea type="text"  name="review" rows="4"
                              placeholder = "Enter your text"
                              onChange={this.changeHandler}>                           
                    </textarea>
                    <button onClick={this.submitHandler}>Submit</button> 
                    </>
                    :
                    <button onClick={this.clickHandler}>Leave a review</button> 
                }
                      {this.renderReviews()}  
            </div>
        );
    }
}

export default ReviewContainer;
 
