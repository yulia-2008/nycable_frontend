import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';




class NavBar extends Component {
    render() {
        return (            
            <span>     
                <NavLink id="nav-bar" to='/' > App  </NavLink> &nbsp;  &nbsp;
                
                {this.props.currentUser? <span onClick={this.props.logoutHandler}>Logout</span> :
                    <NavLink id="nav-bar" to='/signup'> Signup/Login </NavLink>  
                 }&nbsp;  &nbsp;

                <NavLink id="nav-bar" to='/profile' > 
                  {this.props.currentUser? 
                     <span>Profile ({this.props.currentUser.first_name})</span>
                     :
                     null
                  }
                </NavLink>                  
             </span> 
        );
    }
}

export default NavBar;
 