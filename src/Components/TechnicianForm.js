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
            <div>
                <form onSubmit = {event => this.props.submitTechnicianHandler(event, this.state)}>
                <label>First Name:</label>
                <br/>
                <input type="text"  name="firstName" onChange={this.changeHandler}></input>
                <br/>
                <label>Last Name</label>
                <br/>
                <input type="text"  name="lastName" onChange={this.changeHandler}></input>
                <br/>
                {/* <label>Company</label>
                <br/>
                <input type="text"  name="company" onChange={this.changeHandler}></input>
                <br/> */}

                
<label >Company</label> 
  <select name="company" onChange={this.changeHandler}>
    <option value="Optimum">Optimum</option>
     <option value="Dish">Dish</option>
    <option value="Spectrum">Spectrum</option>
    <option value="Direct TV">Direct TV</option>
    <option value="Verizon">Verizon</option> 
 </select> 
 <b></b>
  







                <label>City/Town</label>
                <br/>
                <input type="text"  name="city" onChange={this.changeHandler}></input>
                <br/>               
                <div>
                  <input type="submit" value="Submit"></input>
                  <input type="reset" ></input>
                </div> 
              </form>
              <br></br>
            
              <form onSubmit = {event => this.props.signUpHandler(event)}></form>
            </div>
        );
    }
}

export default TechnicianForm;
