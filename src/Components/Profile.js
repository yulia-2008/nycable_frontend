import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";


class Profile extends Component {
    render() { 
        // console.log(this.props.technician)
        return (
            <div>
                {this.props.technician.picture ? 
                    <img id="photo-profile" src={this.props.technician.picture}></img> 
                    :
                    <img id="photo-profile" src={Avatar}></img>                    
                }
                <br></br>
                  {this.props.technician.first_name} {this.props.technician.last_name}

                  <p>Rating: {this.props.technician.rating}</p>

                  <p>Worked for: {this.props.technician.company_name}</p>
            </div>
        );
    }
}

export default Profile;
