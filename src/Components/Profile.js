import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image, Transformation} from 'cloudinary-react';
import ReviewContainer from "../Containers/ReviewContainer";
import Rating from 'material-ui-rating'


class Profile extends Component {
 state={
   averageRating: 0
 } 

//   componentDidMount(){      
//     fetch(`http://localhost:4000/technicians/${this.props.technician.id}/ratings`)
//     .then(response => response.json())
//     .then(response =>  this.setState({ratings: response}, this.findAveregeRating())
//     )
// }

submitRating = ratingNumber => {
  let options = { method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                         Accept: 'application/json'
                        },
                         body: JSON.stringify({
                           rating: { user_id: this.props.currentUser.id,
                                     num: ratingNumber,
                                     subject_id: this.props.user.id,
                                     subject_type: "User",                                    
                                   }
                         })
                       }
        fetch('http://localhost:4000/ratings', options)
        .then(response => response.json())
        .then(response => {this.increaseRating(response.num)
        })
}
                     
  increaseRating = value => {  
        let ratingsQuantity = this.props.user.ratings.length;
        let sum = value;
               
        for( let i = 0; i < ratingsQuantity; i++)
            { sum += this.props.user.ratings[i].num } 

        let increased =  sum / (ratingsQuantity+1) 
       this.setState({averageRating: increased})

  }      


componentDidMount(){

  if (this.props.user.ratings.length >=1) {
    let ratingsQuantity = this.props.user.ratings.length;
    let sum = 0;    
    for ( let i = 0; i < ratingsQuantity; i++)
        { sum += this.props.user.ratings[i].num }
    let average =  sum / ratingsQuantity  
    this.setState({averageRating: average})
    }
}

// getCustomerInfo = () =>{
//   fetch(`http://localhost:4000/users/${this.props.customerId}`)
//   .then(response => response.json())
//   .then(response => this.setState.name({cusomer: response})
//   )
// }

    
    render() { 
          //  console.log("profile now", this.props)
        return (
          //  this.props.customer ? <p>{this.props.customer.id}</p> : 
           <>
          <div id="flex-container">
              <div id="user-card">
               

              <h1>{this.props.user.first_name} {this.props.user.last_name}</h1>
                   
                {this.props.user.photo ? 

              <Image cloudName="dytr9lvlc" 
                     publicId={this.props.user.photo} 
                     width="300" height= "300" 
                     crop="pad"   radius="20" />
                    :
                    <img id="photo-profile" src={Avatar}></img>                    
                }
                <br></br>

                  <p>Works for: {this.props.user.company_name}</p>
                  <div id="rating-flex">
                       <p id="rating-centered">Rating {this.state.averageRating.toFixed(1)}</p>&nbsp; 
                      <Rating name="half-rating" readOnly="true" value={this.state.averageRating}  precision={0.5}  size="small"/>    
                  </div>
            </div>
            {/* {this.props.currentUser ? */}
            <ReviewContainer user={this.props.user}
                             currentUser={this.props.currentUser}
                             submitReview={this.props.submitReview}
                             clickHandler={this.props.clickHandler}
                             submitRating={this.submitRating} />
             {/* : 
             <ReviewContainer user={this.props.user}
                              clickHandler={this.props.clickHandler} />  
            }  */}

        </div>
</>
        );
    }
}

export default Profile;
