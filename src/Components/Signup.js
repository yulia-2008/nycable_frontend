import React, { Component } from 'react';

class Signup extends Component {
    render() {
        return (
            <div>
               <h4>Signup</h4>
              {/* <form onSubmit = {event => this.props.signUpHandler(event)}>

                  <label>User name:</label> <br/>               
                  <input type="text"  name="name" 
                         onChange = {event=> this.props.changeHandler(event)}>
                  </input>
                  <br/>
                  

                  <label>Email:</label><br/> 
                  <input type="text"  name="email"
                         onChange = {event=> this.props.changeHandler(event)}>
                  </input>
                  <br/> 

                  <label>City:</label><br/> 
                  <input type="text"  name="city"
                         onChange = {event=> this.props.changeHandler(event)}>
                  </input>
                  <br/>         
                  
                  <label>Password:</label><br/> 
                  <input type="password"  name="password"
                         onChange = {event=> this.props.changeHandler(event)}>
                   </input>
                  <br/>

                  <label>Photo:</label><br/>               
                  <input type="text"  name="photo"
                         onChange = {event=> this.props.changeHandler(event)}> 
                  </input>
                  <br/><br/>
                  
                  <input id='signup-btn' className="button" type="submit" value="Submit"></input>
               <p>{this.props.currentUser.error}</p>  
              </form>  */}
            </div>
        );
    }
}

export default Signup;
