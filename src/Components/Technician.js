import React, { Component } from 'react';


class Technician extends Component {
    render() {console.log("hey", this.props)
        return (
            <div>
               <p> {this.props.technician.first_name}</p>
               <p> {this.props.technician.last_name}</p>
               <p> {this.props.technician.city}</p>
                {/* <p> {this.props.technician.company.name}</p>  */}
            </div>
        );
    }
}

export default Technician;
