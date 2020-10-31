import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image, Transformation} from 'cloudinary-react';



class Technician extends Component {
    render() {
        //  console.log("hey", this.props.technician.picture)
        return (
            <div>
               <p>  {this.props.technician.picture ? <>
{/* <Image id="photo-preview" cloudName="dytr9lvlc" publicId={this.props.technician.picture}  >
  <Transformation radius="max" /> 
</Image> */}
                 
                   <img id="photo-preview" src={this.props.technician.picture}></img></> :                   
                                                    <img id="photo-preview" src={Avatar}></img> 
                  }
                   {this.props.technician.first_name}&nbsp;
                   {this.props.technician.last_name}&nbsp;
                   {this.props.technician.city}&nbsp;
                   {this.props.technician.company_name}&nbsp;
                   {this.props.technician.rating}
                  
                  </p> 

            </div>
        );
    }
}

export default Technician;
