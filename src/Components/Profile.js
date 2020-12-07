import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image} from 'cloudinary-react';
import TechnicianReviews from "../Containers/TechnicianReviews";
import Rating from 'material-ui-rating';
import {NavLink} from 'react-router-dom';
import ArrowIcon from "../ArrowIcon.png";


class Profile extends Component {
     
    render() { 
            // console.log("profile now", this.props.user)
        return ( 

          <div id="right-container">
              <NavLink  to='/' ><span> <img id ="arrow" src={ArrowIcon}></img> Back to technicians</span> </NavLink> <br></br>
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
           
              <TechnicianReviews user={this.props.user}
                                currentUser={this.props.currentUser}
                                submitReview={this.props.submitReview}
                                submitRating={this.props.submitRating} />
          </div>
        );
    }
}

export default Profile;
