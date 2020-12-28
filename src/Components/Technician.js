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
            //   console.log("technician", this.props.technician)
        return (
            <div className="grid-item">
            <div id="flex">                
                <span >
                    {this.props.technician.photo ?
                        <Image cloudName="hkkxkj5mz"
                               publicId={this.props.technician.photo} 
                               width="100" height= "100" 
                               crop="thumb" gravity="face" 
                               radius="20" />  
                        :                   
                       <img id="photo-preview" src={Avatar} alt="avatar"></img> 
                    }
                </span>

                <div id="margin-left">
                    <h3 id="no-margin">{this.props.technician.first_name} <br></br>{this.props.technician.last_name}
                        {this.props.currentUser && this.props.currentUser.id === this.props.technician.id ?
                            " (you)"
                            : 
                            null
                        }
                    </h3>
                    {this.props.technician.city}<br/>
                    {this.props.technician.company_name}&nbsp;
                </div> 

            </div>

            <div id="flex">  
                {this.averageRating().toFixed(1)}
                <Rating name="half-rating" value={this.averageRating()} readOnly="true" precision={0.5}  size="small" />                     
            </div>

            <div>
                <NavLink to={this.props.currentUser && this.props.currentUser.id === this.props.technician.id ? 
                         '/profile' :
                         `/technicians/${this.props.technician.id}` }> 
                         {this.props.technician.reviews.length} reviews
                </NavLink><br/> 
            </div>
       </div>
            
        );
    }
}

export default Technician;
