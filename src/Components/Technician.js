import React, { Component } from 'react';


class Technician extends Component {
    render() {
        // console.log("hey", this.props)
        return (
            <div>
               <p> {this.props.technician.first_name}&nbsp;
                {this.props.technician.last_name}&nbsp;
                {this.props.technician.city}&nbsp;
                 {this.props.technician.company_name} </p> 
            </div>
        );
    }
}

export default Technician;
