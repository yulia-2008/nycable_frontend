import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image, Transformation} from 'cloudinary-react';
import { NavLink } from 'react-router-dom';



class Technician extends Component {

clickHandler =() =>{this.props.clickHandler(this.props.technician)

}    
    render() {
        //  console.log("hey", this.props.technician.picture)
        return (
            <div>
               <p>  {this.props.technician.picture ?
                       <img id="photo-preview" src={this.props.technician.picture}></img> :                   
                       <img id="photo-preview" src={Avatar}></img> 
                    }
                   <NavLink to={`/technician/${this.props.id}`}> 
                   <span onClick={this.clickHandler}>{this.props.technician.first_name}&nbsp;
                   {this.props.technician.last_name}&nbsp;
                   </span>
                   </NavLink>
                   {this.props.technician.city}&nbsp;
                   {this.props.technician.company_name}&nbsp;
                   {this.props.technician.rating}
                  
                  </p> 

            </div>
        );
    }
}

export default Technician;
