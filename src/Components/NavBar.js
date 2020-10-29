import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Profile from '../Containers/Profile';



class NavBar extends Component {
    render() {
        return (            
            <span>     
                <NavLink id="nav-bar" to='/' > App  </NavLink> &nbsp;


                {this.props.currentUser? <p onClick={this.props.logoutHandler}>Logout</p> :
                    <NavLink id="nav-bar" to='/signup'> Signup/Login </NavLink> 
                 }


                <NavLink id="nav-bar" to='/profile' > 
                  {this.props.currentUser? 
                     <p>Profile ({this.props.currentUser.first_name})</p>
                     :
                     <p>Profile("You're not logged in")</p>
                  }
                </NavLink>                  
            </span> 
        );
    }
}

export default NavBar;
 