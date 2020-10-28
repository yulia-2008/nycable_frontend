import React, { Component } from 'react';


class Technician extends Component {
    render() {
        //   console.log("hey", this.props.technician.first_name + this.props.technician.last_name)
        return (
            <div>
               <p> {this.props.technician.first_name}&nbsp;
                   {this.props.technician.last_name}&nbsp;
                   {this.props.technician.city}&nbsp;
                   {this.props.technician.company_name}&nbsp;
                   {this.props.technician.rating}
                   {this.props.technician.picture ? <img id="phono-preview" src={this.props.technician.picture}></img> : null}
                  </p> 

            </div>
        );
    }
}

export default Technician;
