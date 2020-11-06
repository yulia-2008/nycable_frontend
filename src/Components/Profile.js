import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image, Transformation} from 'cloudinary-react';
import ReviewContainer from "../Containers/ReviewContainer";
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';


class Profile extends Component {

//   componentDidMount(){      
//     fetch(`http://localhost:4000/technicians/${this.props.technician.id}/ratings`)
//     .then(response => response.json())
//     .then(response =>  this.setState({ratings: response}, this.findAveregeRating())
//     )
// }
clickHandler = event => {
  
}

    
    render() { 
        console.log("profile", this.props.technician)
        return (
          <div id="flex-container">
              <div id="user-card">

              <h1>{this.props.technician.first_name} {this.props.technician.last_name}</h1>
                   
                {this.props.technician.photo ? 

              <Image cloudName="dytr9lvlc" 
                     publicId={this.props.technician.photo} 
                     width="300" height= "300" 
                     crop="pad"   radius="20" />
                      // <img id="photo-profile" src={this.props.technician.picture}></img> 
                    :
                    <img id="photo-profile" src={Avatar}></img>                    
                }
                <br></br>

                  <p>Works for: {this.props.technician.company_name}</p>
                  <p id="rating-flex"><div>Rating</div>&nbsp; &nbsp; 
                    <div>
                    space for rating
                    </div>
                  </p>
            </div>
            {this.props.currentUser ?
            <ReviewContainer user={this.props.technician}
                             currentUser={this.props.currentUser}
                             submitReview={this.props.submitReview} />
             : 
             <ReviewContainer user={this.props.technician}/>  
            }             
        </div>
        );
    }
}

export default Profile;
