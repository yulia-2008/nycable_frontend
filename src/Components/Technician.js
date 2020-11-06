import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image, Transformation} from 'cloudinary-react';
import { NavLink } from 'react-router-dom';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import Icon from '@material-ui/core/Icon';



class Technician extends Component {
 
// findImageName =()=>{
   
//  let url = this.props.technician.picture.split("/")
//  let fileName = url.slice(-1)
//  let fileNameString = fileName[0]

//  return fileNameString
// }


starRating = () => { 
   
       }  


    render() {
        //   console.log("technician", )
        return (
            <div>

               <p> 
                   <span className="rounded"> {this.props.technician.photo ?
                        <Image cloudName="dytr9lvlc"
                         publicId={this.props.technician.photo} 
                         width="100" height= "100" 
                         crop="thumb" gravity="face" 
                          radius="max" />  

                    //   css images
                    //    <img id="photo-preview" src={this.props.technician.picture}></img>
                        :                   
                       <img id="photo-preview" src={Avatar}></img> 
                    } &nbsp;
                    </span>
                   <NavLink to={`/technician/${this.props.id}`}> 
                   <span onClick={()=>this.props.clickHandler(this.props.technician)}>{this.props.technician.first_name}&nbsp;
                   {this.props.technician.last_name}
                   </span> 
                   </NavLink>&nbsp; &nbsp;
                   {this.props.technician.city}&nbsp;
                   {this.props.technician.company_name}&nbsp;


                 <p> Space for rating
                 </p>
                 <Icon>star</Icon>
                   
                  </p> 

            </div>
        );
    }
}

export default Technician;
