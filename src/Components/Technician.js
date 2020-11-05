import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";
import {Image, Transformation} from 'cloudinary-react';
import { NavLink } from 'react-router-dom';
import Star1 from "../Star1.jpg"
import Star2 from "../Star2.jpg"



class Technician extends Component {
 
// findImageName =()=>{
   
//  let url = this.props.technician.picture.split("/")
//  let fileName = url.slice(-1)
//  let fileNameString = fileName[0]

//  return fileNameString
// }


starRating = () => { 
    

      // find a sum of all rating stars
    let sum = 0      
    for (let i = 0; i < this.props.technician.ratings.length; i++) {
    sum += this.props.technician.ratings[i].num
    }
    
      // find average and return appropriate amount of yellow and white star-icons
    let average = (sum / this.props.technician.ratings.length).toFixed()   
    //let whiteStarsAmount = 5-average
    // let count=0; while(count < average) {}
     //for (let i=0; i < average; i++) {this.setState({i: Star2})}
    //   function whiteStars(){
    //      for (let i=0; i < whiteStarsAmount; i++) {
    //         return  <img id="star" src={Star1} />
    //      }  
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


                 <p> <img className="star" src={Star1}></img>
                 <img className="star" src={Star1}></img>
                 <img className="star" src={Star1}></img>
                 <img className="star" src={Star1}></img>
                 <img className="star" src={Star1}></img>
                 </p>
                   
                  </p> 

            </div>
        );
    }
}

export default Technician;
