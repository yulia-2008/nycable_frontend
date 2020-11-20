import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image} from 'cloudinary-react';
import { NavLink } from 'react-router-dom';
import Rating from 'material-ui-rating'



class Technician extends Component {
 
    averageRating = () => {
        let average = 0;
        if (this.props.technician.ratings.length >=1) {        
        let ratingsQuantity = this.props.technician.ratings.length;
        let sum = 0;
        for ( let i = 0; i < ratingsQuantity; i++)
            { sum += this.props.technician.ratings[i].num }
        average =  sum / ratingsQuantity 
        } 
        return average
    }

    render() {
            // console.log("technician", this.props.technician)
        return (
            <>
            <div id="flex">                
                <span >
                    {this.props.technician.photo ?
                        <Image cloudName="dytr9lvlc"
                               publicId={this.props.technician.photo} 
                               width="100" height= "100" 
                               crop="thumb" gravity="face" 
                               radius="max" />  
                        :                   
                       <img id="photo-preview" src={Avatar}></img> 
                    } &nbsp;
                </span>
                <div>
                   <NavLink to={this.props.currentUser && this.props.currentUser.id === this.props.technician.id ? 
                      '/profile' :
                      `/user/${this.props.technician.id}` }> 
                        {this.props.technician.first_name}&nbsp;{this.props.technician.last_name}
                   </NavLink><br/>

                   {this.props.technician.city}<br/>
                   {this.props.technician.company_name}&nbsp;
                </div>   
            </div>
            <div id="flex">  
            <p id="rating-centered">{this.averageRating().toFixed(1)}</p>
            <Rating name="half-rating" value={this.averageRating()} readOnly="true" precision={0.5}  size="small"/>                     
       </div> <br/><br/>
       </>
            
        );
    }
}

export default Technician;
