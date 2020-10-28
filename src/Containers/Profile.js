import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import PhotoUploader from '../Components/PhotoUploader';



class Profile extends Component {
    state={
        company: "",
        clicked: false             
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

changeHandler = event => {this.setState({ [event.target.name]: event.target.value})
}

clickHandler =() => {this.setState({clicked: !this.state.clicked})

}

companySubmitHandler = event => {
    event.preventDefault()
    this.props.companySubmitHandler(this.state.company)
}



    render() { 
         console.log( "Profile", this.props.currentUser)  
        return ( 
                       
        <div > {this.props.currentUser  ? <><h1>Profile</h1> 
                    <p>{this.props.currentUser.first_name} &nbsp; {this.props.currentUser.last_name}</p>
                    <p>city: {this.props.currentUser.city}</p>
                    {this.props.currentUser.picture ? <img id="phono-preview" src={this.props.currentUser.picture}></img> : null}


                    {this.props.currentUser.role==="technician" ?
                                   <>
                                   <p>Rating: {this.props.currentUser.rating}</p>
                                   <p>Company you work for: {this.props.currentUser.company_name}</p>
                                   </>
                                   :
                                   <p>Company you get a service from: {this.props.currentUser.company_name}</p>
                    }
                                  
                    <form onSubmit={this.companySubmitHandler}>
                      <select id="select-field" name="company" onChange={this.changeHandler}>
                        <option value="">Add Company</option>
                        <option value="Optimum">Optimum</option>
                        <option value="Dish">Dish</option>
                        <option value="Spectrum">Spectrum</option>
                        <option value="Direct TV">Direct TV</option>
                        <option value="Verizon">Verizon</option> 
                      </select> 
                    <br></br> <br></br>  
                                             
                   <input type="submit" value="Submit"></input> &nbsp;
                {/* <input type="reset" ></input> */}
                   </form>

                   <button onClick={this.clickHandler}> Add photo</button>
                   {this.state.clicked ? <PhotoUploader currentUser={this.props.currentUser}
                                                        submitPhoto={this.props.submitPhoto} />
                                         : null }                                
                    </>  
            :        
        <><Redirect to="/signup" />
        {console.log("hey", localStorage.getItem("token"))}</>
        }
               
        </div> 
        );
    }
}

export default Profile;
