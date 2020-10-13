import React, { Component } from 'react';

class TechnicianForm extends Component {
    state={
        firstName: "",
        lastName: "",
        company: "",
        city: ""
    }


    changeHandler = event => {this.setState({ [event.target.name]: event.target.value})
   }

    render() {
        return (
            <div> Add new Technician
                <form onSubmit = {event => this.props.submitTechnicianHandler(event, this.state)}>
                <input type="text"  name="firstName" placeholder="First Name" onChange={this.changeHandler}></input>
                <br/>               
                <input type="text"  name="lastName" placeholder="Last Name" onChange={this.changeHandler}></input>
                <br/>               
                <input type="text"  name="city" placeholder="City/Town" onChange={this.changeHandler}></input>
                <br/>  
                {/* <input type="text"  name="company" placeholder="Company" autocomplete="on" onChange={this.changeHandler}></input>
                <br/> <br></br> */}
                
               <label>Company</label> 
                    <select name="company" onChange={this.changeHandler}>
                        <option value="">Choose Company</option>
                        <option value="Optimum">Optimum</option>
                        <option value="Dish">Dish</option>
                        <option value="Spectrum">Spectrum</option>
                        <option value="Direct TV">Direct TV</option>
                        <option value="Verizon">Verizon</option> 
                    </select> 
                    <br></br> <br></br>  
                                           
                <input type="submit" value="Submit"></input> &nbsp;
                <input type="reset" ></input>
                 
              </form>
              <br></br>
            
            </div>
        );
    }
}

export default TechnicianForm;
