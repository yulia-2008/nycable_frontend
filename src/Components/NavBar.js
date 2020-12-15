import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';




class NavBar extends Component {
    render() {
        return (            
            <span>     
                <NavLink  to='/' > Home  </NavLink>
                &nbsp;  &nbsp;

                <NavLink  to='/technicians'> Technicians </NavLink>
                &nbsp;  &nbsp;
            
                <NavLink  to='/profile' > 
                  {this.props.currentUser? 
                     <span>Profile ({this.props.currentUser.first_name})&nbsp;  &nbsp; </span>   
                     :
                     null
                  }  
                </NavLink>  
               

                {this.props.currentUser? 
                    <span id ="color" onClick={this.props.logoutHandler}>Logout</span>
                    :
                    <NavLink  to='/signup'> Signup/Login </NavLink>  
                }

             </span> 
        );
    }
}

export default NavBar;
 