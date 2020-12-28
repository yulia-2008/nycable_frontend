import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';




class NavBar extends Component {
    render() {
        return (            
            <div id="nav-bar"> 
                <br></br>
                <NavLink  to='/'> Home </NavLink>
                &nbsp;  

                <NavLink  to='/providers' > Providers  </NavLink>
                &nbsp;  

                <NavLink  to='/technicians'> Technicians </NavLink>
                &nbsp;  
            
                <NavLink  to='/profile' > 
                  {this.props.currentUser? 
                     <span>Profile &nbsp;  </span>   
                     :
                     null
                  }  
                </NavLink>  
               

                {this.props.currentUser? 
                    <span id ="color" onClick={this.props.logoutHandler}>Logout</span>
                    :
                    <NavLink  to='/signup'> Signup/Login </NavLink>  
                }
             <br></br> <br></br>
             </div> 
        );
    }
}

export default NavBar;
 