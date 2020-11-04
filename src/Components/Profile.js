import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image, Transformation} from 'cloudinary-react';
import ReviewContainer from "../Containers/ReviewContainer";


class Profile extends Component {

    
    render() { 
        // console.log(this.props.technician)
        return (
          <div id="flex-container">
              <div id="user-card">
              <h1>{this.props.technician.first_name} {this.props.technician.last_name}</h1>
                   
                {this.props.technician.photo ? 

<Image cloudName="dytr9lvlc" publicId={this.props.technician.photo} width="300" height= "300" crop="pad"   radius="20" />
                    // <img id="photo-profile" src={this.props.technician.picture}></img> 
                    :
                    <img id="photo-profile" src={Avatar}></img>                    
                }
                <br></br>
                 

                  <p>Rating: {this.props.technician.rating}</p>

                  <p>Works for: {this.props.technician.company_name}</p>
            </div>
            <ReviewContainer user={this.props.technician}
                             submitReview={this.props.submitReview} />
        </div>
        );
    }
}

export default Profile;
