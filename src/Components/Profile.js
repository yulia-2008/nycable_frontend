import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image, Transformation} from 'cloudinary-react';


class Profile extends Component {

    // submitPhoto = user => {
    //     // optimistic rendering new user picture
    //      let photo = {photo: user.photo}
    //      let updatedCurrentUser=Object.assign(this.state.currentUser, photo)
    //      this.setState({currentUser: updatedCurrentUser})
    //   }
    render() { 
        // console.log(this.props.technician)
        return (
            <div>
                {this.props.technician.photo ? 

<Image cloudName="dytr9lvlc" publicId={this.props.technician.photo} width="300" height= "300" crop="pad"   radius="20" />
                    // <img id="photo-profile" src={this.props.technician.picture}></img> 
                    :
                    <img id="photo-profile" src={Avatar}></img>                    
                }
                <br></br>
                  {this.props.technician.first_name} {this.props.technician.last_name}

                  <p>Rating: {this.props.technician.rating}</p>

                  <p>Works for: {this.props.technician.company_name}</p>
            </div>
        );
    }
}

export default Profile;
