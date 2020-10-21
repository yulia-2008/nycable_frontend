import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';



class NavBar extends Component {
    render() {
        return (
             
            <div >     
                <NavLink  to='/' exact>
                  App
                </NavLink> &nbsp;

                <NavLink  to='/signup' exact>
                  Signup/Login
                </NavLink> &nbsp;

                <NavLink  to='/profile' exact > 
                   Profile
                </NavLink>                  
            </div> 
        );
    }
}

export default NavBar;
 