import React, { Component } from 'react';
import Avatar from "../Avatar.jpg";



class Technician extends Component {
    render() {
        //    console.log("hey", this.props.technician)
        return (
            <div>
               <p> {this.props.technician.first_name}&nbsp;
                   {this.props.technician.last_name}&nbsp;
                   {this.props.technician.city}&nbsp;
                   {this.props.technician.company_name}&nbsp;
                   {this.props.technician.rating}
                   {this.props.technician.picture ? <img id="photo-preview" src={this.props.technician.picture}></img> :
                                                    <img id="photo-preview" src={Avatar}></img> 
                  }
                  </p> 

            </div>
        );
    }
}

export default Technician;
