import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import PhotoUploader from '../Components/PhotoUploader';
import Avatar from "../Avatar.jpg";
import {Image, Transformation} from 'cloudinary-react';
import ReviewContainer from "./ReviewContainer";


class CurrentUserProfile extends Component {
    state={
        company: "",
        clicked: false             
    }
 

// submitPhoto = user => {
//         // optimistic rendering new user picture
//          let photo = {photo: user.photo}
//          let updatedCurrentUser=Object.assign(this.state.currentUser, photo)
//          this.setState({currentUser: updatedCurrentUser})
//       }

changeHandler = event => {this.setState({ [event.target.name]: event.target.value})
}

clickHandler =() => {this.setState({clicked: !this.state.clicked})

}

companySubmitHandler = event => {
    event.preventDefault()
    this.props.companySubmitHandler(this.state.company)
}



    render() { 
        //  console.log( "Profile", this.props.currentUser)  
        return (                     
            <div id="flex-container"> 
              <div>
                <h1>{this.props.currentUser.first_name} &nbsp; {this.props.currentUser.last_name}</h1>
                {this.props.currentUser.photo ? 

<Image cloudName="dytr9lvlc" publicId={this.props.currentUser.photo} width="300" height= "300" crop="pad"   radius="20" />
                    // <img id="photo-profile" src={this.props.currentUser.picture}></img> 
                    :
                    <img id="photo-profile" src={Avatar}></img>                    
                }
                <PhotoUploader  currentUser={this.props.currentUser}
                                submitPhoto={this.props.submitPhoto} />
                <p>City: {this.props.currentUser.city}</p>
                   

                {this.props.currentUser.role==="technician" ?
                    <>
                        <p>Rating: {this.props.currentUser.rating}</p>
                        <p>Company you work for: {this.props.currentUser.company_name}</p>
                    </>
                    :
                        <p>Company you get a service from: {this.props.currentUser.company_name}</p>
                }
                                  
                    <form onSubmit={this.companySubmitHandler}>
                      <select id="select-field" name="company" onChange={this.changeHandler}>
                        <option value="">Change Company</option>
                        <option value="Optimum">Optimum</option>
                        <option value="Dish">Dish</option>
                        <option value="Spectrum">Spectrum</option>
                        <option value="Direct TV">Direct TV</option>
                        <option value="Verizon">Verizon</option> 
                      </select> 
                     
                                             
                      <input type="submit" value="Submit"></input> &nbsp;
                     {/* <input type="reset" ></input> */}
                   </form>              
          </div>  
            <ReviewContainer user={this.props.currentUser}/>
        </div>
        );
    }
}

export default CurrentUserProfile;
