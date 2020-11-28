import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image} from 'cloudinary-react';
import ReviewContainer from "../Containers/ReviewContainer";
import Rating from 'material-ui-rating';
import {NavLink} from 'react-router-dom';
import ArrowIcon from "../ArrowIcon.png";


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
            // console.log("profile now", this.props.user)
        return (
          //  this.props.customer ? <p>{this.props.customer.id}</p> : 
           
          <div id="right-container">

              <NavLink  to='/' ><span> <img id ="arrow" src={ArrowIcon}></img> Back to technicians</span> </NavLink>
              <div id="user-card">
               

              <h1 id ="no-margin">{this.props.user.first_name} {this.props.user.last_name}</h1>
                   
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
                  <div id="flex">
                       <p id="rating-centered">{this.state.averageRating.toFixed(1)}</p>&nbsp; 
                      <Rating name="half-rating" readOnly value={this.state.averageRating}  precision={0.5}  size="small"/>    
                  </div>
            </div>
           
            <ReviewContainer user={this.props.user}
                             currentUser={this.props.currentUser}
                             submitReview={this.props.submitReview}
                            //  clickHandler={this.props.clickHandler}
                             submitRating={this.submitRating} />
            

        </div>

        );
    }
}

export default Profile;
