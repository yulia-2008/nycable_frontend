import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';




class Profile extends Component {
    state={
        
    }
 
//     componentDidMount(){ 
//         const token = localStorage.getItem("token")
//          fetch(`http://localhost:4000/api/v1/helpers/${this.props.currentUser.user.id}`, {
//              method: "GET",
//              headers: {
//                 'Content-Type': 'application/json',
//                  Accept: 'application/json',
//                  Authorization: `Bearer ${token}`
                                         
//                  }
//          })
//         .then(response => response.json())
//         .then(resp =>this.setState({helpedPosts: resp}))
//          console.log("profile did mount")
// }

    render() {
        return ( 
            //  console.log( "Profile", )            
        <div > {this.props.user? <h1>profile</h1> : 
        
        <Redirect to="/signup" />
        
        }
               
        </div> 
        );
    }
}

export default Profile;
