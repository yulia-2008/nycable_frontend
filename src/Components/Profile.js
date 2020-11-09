import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image, Transformation} from 'cloudinary-react';
import ReviewContainer from "../Containers/ReviewContainer";
import Rating from 'material-ui-rating'


class Profile extends Component {
 state={
   averageRating: this.averageRating
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
                                     subject_id: this.props.technician.id,
                                     subject_type: "User",                                    
                                   }
                         })
                       }
        fetch('http://localhost:4000/ratings', options)
        .then(response => response.json())
        .then(response => {this.increaseRating(response)
        })
}
                     
  increaseRating = (argument) => {
    console.log("length",this.props.technician.ratings.length)
        let ratingsQuantity = this.props.technician.ratings.length;
        let sum = argument.num;
               
        for( let i = 0; i < ratingsQuantity; i++)
            { sum += this.props.technician.ratings[i].num } 

        let average =  sum / (ratingsQuantity+1) 
        // this.setState({averageRating: average})

  }      


averageRating = () =>{
 let ratingsQuantity = this.props.technician.ratings.length;
 let sum = 0;
 for ( let i = 0; i < ratingsQuantity; i++)
     { sum += this.props.technician.ratings[i].num }
 let average =  sum / ratingsQuantity   
     return average
 }

    
    render() { 
          console.log("profile now", this.props.technician.ratings)
        return (
          <div id="flex-container">
              <div id="user-card">

              <h1>{this.props.technician.first_name} {this.props.technician.last_name}</h1>
                   
                {this.props.technician.photo ? 

              <Image cloudName="dytr9lvlc" 
                     publicId={this.props.technician.photo} 
                     width="300" height= "300" 
                     crop="pad"   radius="20" />
                    :
                    <img id="photo-profile" src={Avatar}></img>                    
                }
                <br></br>

                  <p>Works for: {this.props.technician.company_name}</p>
                  <div id="rating-flex">
                      {/* <p id="rating-centered">Rating {this.state.averageRating.toFixed(1)}</p>&nbsp; 
                      <Rating name="half-rating" readOnly="true" value={this.state.averageRating}  precision={0.5}  size="small"/>    */}
                  </div>
            </div>
            {this.props.currentUser ?
            <ReviewContainer user={this.props.technician}
                             currentUser={this.props.currentUser}
                             submitReview={this.props.submitReview}
                             submitRating={this.submitRating} />
             : 
             <ReviewContainer user={this.props.technician}/>  
            }             
        </div>
        );
    }
}

export default Profile;
