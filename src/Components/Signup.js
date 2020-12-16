import React, { Component } from 'react';

class Signup extends Component {
       state={
              username: "",
              password: "",
              first_name: "",
              last_name: "",
              city: "",
              role: ""

       }

changeHandler = event => {this.setState({ [event.target.name]: event.target.value})
}

signUpHandler = event => {
       event.preventDefault()
       this.props.signUpHandler(this.state)
       event.target.reset()
}
loginHandler = event => {
       event.preventDefault()
       this.props.loginHandler(this.state)      
}

    render() {
        return (
              
            <div id="centered">
              <h4>Login</h4>
              <form onSubmit = {event => this.loginHandler(event)}>
                <label>User name:</label>
                <br/>
                <input type="text"  name="username" onChange = {event=> this.changeHandler(event)}></input>
                <br/>
                <label>Password:</label>
                <br/>
                <input type="password"  name="password" onChange = {event=> this.changeHandler(event)}></input>
                <br/>               
                <input  type="submit" value="Submit"></input>              
              </form>
              <br/>


               <h4>Signup</h4>
               <form onSubmit = {event => this.signUpHandler(event)}>

                  <label>User name:</label> <br/>               
                  <input type="text"  name="username" 
                         onChange = {event=> this.changeHandler(event)}>
                  </input>
                  <br/>
                  <input type="radio" name="role" value = "technician"  
                         onChange = {event=> this.changeHandler(event)} required/> Technician
                  <input type="radio" name="role" value = "customer" 
                         onChange = {event=> this.changeHandler(event)} required/> Customer
                  <br/> 

                  <label>First Name:</label><br/> 
                  <input type="text"  name="first_name"
                         onChange = {event=> this.changeHandler(event)}>
                  </input>
                  <br/> 

                  <label>Last Name:</label><br/> 
                  <input type="text"  name="last_name"
                         onChange = {event=> this.changeHandler(event)}>
                  </input>
                  <br/> 

                  <label>City:</label><br/> 
                  <input type="text"  name="city"
                         onChange = {event=> this.changeHandler(event)}>
                  </input>
                  <br/>         
                  
                  <label>Password:</label><br/> 
                  <input type="password"  name="password"
                         onChange = {event=> this.changeHandler(event)}>
                   </input>
                  <br/>                 
                  <input  type="submit" value="Submit"></input>
               
              </form>  
            </div>
        );
    }
}

export default Signup;
