import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Profile from '../Containers/Profile';



class NavBar extends Component {
    render() {
        return (            
            <div >     
                <NavLink  to='/' >
                  App
                </NavLink> &nbsp;


                {this.props.currentUser? <p onClick={this.props.logoutHandler}>Logout</p> :
                    <NavLink  to='/signup'>
                        Signup/Login
                    </NavLink> 
                 }


                <NavLink  to='/profile' > 
                  {this.props.currentUser? 
                     <p>Profile ({this.props.currentUser.first_name})</p>
                     :
                     <p>Profile("You're not logged in")</p>
                  }
                </NavLink>                  
            </div> 
        );
    }
}

export default NavBar;
 