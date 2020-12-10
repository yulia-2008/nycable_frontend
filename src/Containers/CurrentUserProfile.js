import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import PhotoUploader from '../Components/PhotoUploader';
import Avatar from "../Avatar.jpg";
import {Image} from 'cloudinary-react';
import TechnicianReviews from "../Components/TechnicianReviews";
import Rating from 'material-ui-rating'



class CurrentUserProfile extends Component {
    state={
        company: "",
        clicked: false ,
        ratingArray: []            
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

averageRating = () => {
    let average = 0.0
    if (this.props.currentUser.ratings.length >=1) {
    let ratingsQuantity = this.props.currentUser.ratings.length;   
    let sum = 0;
    for ( let i = 0; i < ratingsQuantity; i++)
        { sum += this.props.currentUser.ratings[i].num }
    average =  sum / ratingsQuantity 
    }
    return average
    }

    componentDidMount() {
        fetch(`http://localhost:4000/technicians/${this.props.currentUser.id}/ratings`)
        .then(response => response.json())
        .then(response => { this.setState({ratingArray: response
         })
         })
}

    renderWhoRatedMe = () => {return  this.state.ratingArray.map(rating => 
                            <li>{rating.user.first_name} {rating.user.last_name} - {rating.num} stars</li>
                            )
    }
       
     

        // if  (this.props.currentUser.ratings.length > 0)  
        //     {  
           
        //     }               

        // if (r > 0)
        // {
        //     return r.map(rating => <h> {rating.num} </h>)
        // }
        // else
        //     { return <p>You don't have any ratings yet!</p>}  
            
    

    render() { 
        //   console.log( "Profile", this.props.currentUser)  
        return (                     
            <div id="flex"> 
                <div id="left-margin">
                    <h1>{this.props.currentUser.first_name} &nbsp; {this.props.currentUser.last_name}</h1>

                    {this.props.currentUser.photo ? 
                            <Image  cloudName="dytr9lvlc" 
                                    publicId={this.props.currentUser.photo} 
                                    width="300" height= "300" 
                                    crop="pad"   radius="20" />
                                        // <img id="photo-profile" src={this.props.currentUser.picture}></img> 
                            :
                            <img id="photo-profile" src={Avatar} alt="avatar"></img>                    
                    }

                    <PhotoUploader  currentUser={this.props.currentUser}
                                    submitPhoto={this.props.submitPhoto} />
                    <p>City: {this.props.currentUser.city}</p>
                   

                    {this.props.currentUser.role==="technician" ?
                        <>                       
                        <div id="flex">  
                           <p id="rating-centered">{this.averageRating().toFixed(1)}</p>
                           <Rating name="half-rating" value={this.averageRating()} readOnly="true" precision={0.5}  size="small"/>                     
                        </div>
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

                <div id="left-margin">
                    <TechnicianReviews  currentUser={this.props.currentUser}
                                    //   user={this.props.user}
                                 //  clickHandler={this.props.clickHandler}
                    />
                </div> 

                <div id="left-margin">
                    <h2>Who rated me:</h2>
                    <ul>{this.renderWhoRatedMe()  }</ul>
                </div>
              
            </div>
        );
    }
}

export default CurrentUserProfile;
