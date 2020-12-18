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
                     <div id ="background">
                     <br/>
                            <h4>Login</h4>
                            <form onSubmit = {event => this.loginHandler(event)}>
                                   <label>User name:</label>
                                   <br/>
                                   <input type="text"  name="username"  required onChange = {event=> this.changeHandler(event)}></input>
                                   <br/>
                                   <label>Password:</label>
                                   <br/>
                                   <input type="password"  name="password"  required onChange = {event=> this.changeHandler(event)}></input>
                                   <br/>               
                                   <input id="bold" type="submit" value="Submit"></input>  
                                   <p id="red">{this.props.message.message? this.props.message.message: null}</p>            
                            </form>
                            <br/>


                            <h4>Signup</h4>
                            <form onSubmit = {event => this.signUpHandler(event)}>

                            <input type="radio" name="role" value = "technician"  
                                   onChange = {event=> this.changeHandler(event)} required/> Technician
                            <input type="radio" name="role" value = "customer" 
                                   onChange = {event=> this.changeHandler(event)} required/> Customer
                            <br/>     

                            <label>User name:</label> <br/>               
                            <input type="text"  name="username" required
                                   onChange = {event=> this.changeHandler(event)}>
                            </input>
                            <br/>
                     
                            <label>First Name:</label><br/> 
                            <input type="text"  name="first_name" required
                                   onChange = {event=> this.changeHandler(event)}>
                            </input>
                            <br/> 

                            <label>Last Name:</label><br/> 
                            <input type="text"  name="last_name" required
                                   onChange = {event=> this.changeHandler(event)}>
                            </input>
                            <br/> 

                            <label>City:</label><br/> 
                            <input type="text"  name="city" required
                                   onChange = {event=> this.changeHandler(event)}>
                            </input>
                            <br/>         
                     
                            <label>Password:</label><br/> 
                            <input type="password"  name="password" required
                                   onChange = {event=> this.changeHandler(event)}>
                            </input>
                            <br/>                 
                            <input id="bold" type="submit" value="Submit"></input>
                            <p id="red">{this.props.message.error? this.props.message.error : null}</p>                
                            </form>  
                            <br/> <br/>
              </div>
       </div>
        );
    }
}

export default Signup;
