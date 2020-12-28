import React, { Component } from 'react';
import PhotoUploader from "../Components/PhotoUploader";
import Avatar from "../Avatar.jpg";
import {Image} from "cloudinary-react";
import TechnicianReviews from "../Components/TechnicianReviews";
import Rating from "material-ui-rating"



class CurrentUserProfile extends Component {
    state={
        company: "",
        clicked: false ,
        ratingArray: []            
    }
 

changeHandler = event => {this.setState({ [event.target.name]: event.target.value})
}

clickHandler =() => {this.setState({clicked: !this.state.clicked})

}

companySubmitHandler = event => {
    event.preventDefault()
    this.props.companySubmitHandler(this.state.company)
}

averageRating = () => {
    let average = 0.0
    if (this.props.currentUser.ratings.length > 0) {
        let ratingsQuantity = this.props.currentUser.ratings.length;   
        let sum = 0;
        for ( let i = 0; i < ratingsQuantity; i++)
            { sum += this.props.currentUser.ratings[i].num }
        average =  sum / ratingsQuantity 
    }
    return average
}

componentDidMount() {
    fetch(`https://nycable.herokuapp.com/technicians/${this.props.currentUser.id}/ratings`)
    .then(response => response.json())
    .then(response => { this.setState({ratingArray: response
    })
    })
}

whoRatedMe = () => {return  this.state.ratingArray.map(rating => 
                <div id="flex-left"> 
                    {rating.user.first_name} {rating.user.last_name} &nbsp;
                    <Rating value={rating.num} readOnly="true"  size="small"/>
                    <br></br>
                </div>            
)}      

    render() { 
        //   console.log( "Profile", this.props.currentUser)  
        return (                     
            <div id="centered"> 
                <div >
                    <h1 id="no-margin">{this.props.currentUser.first_name} &nbsp; {this.props.currentUser.last_name}</h1>

                    {this.props.currentUser.role==="technician" ?
                        <div id="flex">  
                            {this.averageRating().toFixed(1)}
                            <Rating name="half-rating" value={this.averageRating()} readOnly="true" precision={0.5}  size="small"/>                     
                        </div>
                        :
                        null
                    }

                    {this.props.currentUser.photo ? 
                            <Image  cloudName="hkkxkj5mz" 
                                    publicId={this.props.currentUser.photo} 
                                    width="300" height= "300" 
                                    crop="fill"   radius="20" 
                                    // crop="pad" - for keeping any pictures in original way by adding horizontalor vertical pads
                                    gravity="auto"/>
                            :
                            <img id="photo-profile" src={Avatar} alt="avatar"></img>                    
                    }

                    <br/>
                    City <b>{this.props.currentUser.city}</b>
                     <br/>                  
                    Company <b>{this.props.currentUser.company_name ? 
                                    this.props.currentUser.company_name 
                                    :
                                    "---"
                                }
                            </b>
                    <br/> <br/>

                    <PhotoUploader  currentUser={this.props.currentUser}
                                    submitPhoto={this.props.submitPhoto} /> <br/>             
                                  
                    <form onSubmit={this.companySubmitHandler}>
                        <select id="select-field" name="company" onChange={this.changeHandler}>
                            <option value="">Change Company</option>
                            <option value="Optimum">Optimum</option>
                            <option value="Dish">Dish</option>
                            <option value="Spectrum">Spectrum</option>
                            <option value="Direct TV">Direct TV</option>
                            <option value="Verizon">Verizon</option> 
                        </select> 
                     
                                             
                        <input id="submit" type="submit" value="Submit"></input> &nbsp;
                    </form>                                
                </div> 

                {this.props.currentUser.role==="technician" ?
                <>
                    <h4>Reviews</h4>
                    <div id="border-box">                        
                        <TechnicianReviews  currentUser={this.props.currentUser}/>
                        <br></br>
                        {this.state.ratingArray===[] ? 
                            null
                            :
                            <>
                            <h4 id="left-align">Rated by:</h4>
                            {this.whoRatedMe()}
                            </>
                        }                        
                    </div>
                    <br></br> <br></br>
                </>
                :
                null
                }

            </div>
        );
    }
}

export default CurrentUserProfile;
