import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image} from 'cloudinary-react';
import { NavLink } from 'react-router-dom';
// import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Rating from 'material-ui-rating'



class Technician extends Component {
 
    averageRating = () => {
        let ratingsQuantity = this.props.technician.ratings.length;
        let sum = 0;
        for ( let i = 0; i < ratingsQuantity; i++)
            { sum += this.props.technician.ratings[i].num }
        let average =  sum / ratingsQuantity  
        return average
        }


    render() {
            // console.log("technician", this.props.technician)
        return (
            <div>                
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
                   <NavLink to={this.props.currentUser && this.props.currentUser.id === this.props.technician.id ? 
                      '/profile' :
                      `/user/${this.props.technician.id}` }> 
                        {this.props.technician.first_name}&nbsp;{this.props.technician.last_name}
                   </NavLink>&nbsp; &nbsp;

                   {this.props.technician.city}&nbsp;
                   {this.props.technician.company_name}&nbsp;

                <div id="rating-flex">  
                    <p id="rating-centered">Rating {this.averageRating().toFixed(1)}</p>
                    <Rating name="half-rating" value={this.averageRating()} readOnly="true" precision={0.5}  size="small"/>                     
                </div> <br/><br/>
            </div>
            
        );
    }
}

export default Technician;
