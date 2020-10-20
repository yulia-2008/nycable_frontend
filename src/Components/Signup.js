import React, { Component } from 'react';

class Signup extends Component {
       state={
              username: "",
              password_digest: "",
              first_name: "",
              last_name: "",
              city: "",

       }

changeHandler = event => {this.setState({ [event.target.name]: event.target.value})
}

signUpHandler = event => {
       event.preventDefault()
       this.props.signUpHandler(this.state)
       event.target.reset()
}
    render() {
        return (
              
            <div>
               <h4>Signup</h4>
               <form onSubmit = {event => this.signUpHandler(event)}>

                  <label>User name:</label> <br/>               
                  <input type="text"  name="username" 
                         onChange = {event=> this.changeHandler(event)}>
                  </input>
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
                  <input type="password"  name="password_digest"
                         onChange = {event=> this.changeHandler(event)}>
                   </input>
                  <br/>

                  
                  <input id='signup-btn' className="button" type="submit" value="Submit"></input>
               
              </form>  
            </div>
        );
    }
}

export default Signup;
