import React from 'react';
import './App.css';
import TechniciansContainer from './Containers/TechniciansContainer';
import CompaniesContainer from './Containers/CompaniesContainer';
import CurrentUserProfile from "./Containers/CurrentUserProfile";
import NavBar from './Components/NavBar';
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import { Route, Switch, withRouter} from 'react-router-dom';

class App extends React.Component {

  state={
    currentUser: null,
    technician: null  
  }
  // componentDidMount(){
  // fetch(`https://www.cabletv.com/ny/brooklyn?zip=11223#internet`)
  // // .then(response => response.json())
  // .then(response => console.log(response))
  // }
clickHandler = technicianObj =>{
  localStorage.setItem("technician", JSON.stringify(technicianObj)) 
 
  this.setState({technician: technicianObj})
}
  
companySubmitHandler = company=>{
  let options = { method: 'PATCH',
                        headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                        },
                        body: JSON.stringify({
                               company_name: company
                        })
                       }
            fetch(`http://localhost:4000/users/${this.state.currentUser.id}`, options)
            .then(response => response.json())
            .then(response => this.setState({currentUser: response.user})
            )
}

signUpHandler = userObj => {
    // get token in response
    let options = { method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                    },
                    body: JSON.stringify({
                           user: userObj
                    })
                   }
        fetch('http://localhost:4000/users', options)
        .then(response => response.json())
        .then(resp => {
           localStorage.setItem("token", resp.jwt) 
           this.setState({currentUser: resp.user}, ()=> this.props.history.push('/profile')
           )
        })
        //collback function run after state is set
 
}

loginHandler = userInfo =>{
    let options = { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify({
        user: {username: userInfo.username,
              password: userInfo.password}
        })
    } 
    
    fetch('http://localhost:4000/login', options)  // got toket in response !
    .then(response => response.json())
    .then(resp =>{
        localStorage.setItem("token", resp.jwt) 
        this.setState({currentUser: resp.user}, ()=> this.props.history.push('/profile')
        )
        })
}

logoutHandler=()=>{
  localStorage.removeItem("token")
  this.setState({currentUser: null
  })
  this.props.history.push('/signup')  //redirecting to sign up 
}

submitPhoto = user => {
  // optimistic rendering new user picture
   let photo = {photo: user.user.photo}
   let updatedCurrentUser=Object.assign(this.state.currentUser, photo)
   this.setState({currentUser: updatedCurrentUser})
  
  //posting to db
  //  let options = { method: 'PATCH',
  //                  headers: {
  //                  'Content-Type': 'application/json',
  //                  Accept: 'application/json'
  //                  },
  //                 body: JSON.stringify({
  //                         photo: user.photo
  //                 })
  //                }
  //   fetch(`http://localhost:4000/users/${this.state.currentUser.id}`, options)
  //   .then(response => response.json())
  //   .then(resp =>{console.log("in upload app", resp)})
}
// submitRating = (ratingNumber, technician) => {
//   let options = { method: 'POST',
//                         headers: {
//                         'Content-Type': 'application/json',
//                          Accept: 'application/json'
//                         },
//                          body: JSON.stringify({
//                            rating: { user_id: this.state.currentUser.id,
//                                      num: ratingNumber,
//                                      subject_id: technician.id,
//                                      subject_type: "User",                                    
//                                    }
//                          })
//                        }
//         fetch('http://localhost:4000/ratings', options)
//         .then(response => response.json())
//         .then(response => {console.log("rating resp", response)}) 
//         // let ratings = [...this.state.technician.ratings, response]
// console.log("s", this.state.technician)
//         // let newTechnicianObj = Object.assign(this.state.techician, ratings)
//         // this.setState({technician: newTechnicianObj}) })
// }


componentDidMount(){ 
  const token = localStorage.getItem("token")  
  if (token) {
       fetch(`http://localhost:4000/profile`, {
           method: "GET", 
           headers: {Authorization: `Bearer ${token}`},
            })
            .then(resp => resp.json())
            .then(resp => this.setState({currentUser: resp.user})
            )
   } 
  // if needed to redirect to login page :
  //  else {
  //    this.props.history.push('/signup')
  //  }  


}
  render(){
       console.log("app", this.state.technician)
    return ( 
    <div className="App">

       <NavBar currentUser={this.state.currentUser} logoutHandler={this.logoutHandler}/> 

       <Switch>
          <Route  path = '/signup' render = {() => <Signup  signUpHandler={this.signUpHandler}
                                                            loginHandler={this.loginHandler} />
          } />
          <Route  path = '/profile' render = {() => 
               this.state.currentUser ? 
                  <CurrentUserProfile  currentUser={this.state.currentUser}
                                       submitPhoto={this.submitPhoto}
                                       companySubmitHandler={this.companySubmitHandler} />
                 : null 
          } />

          <Route  path = '/technician/:id' render = {() => 
              this.state.currentUser  &&  this.state.currentUser.id === this.state.technician.id ?             
               
                    <CurrentUserProfile currentUser={this.state.currentUser}
                                        submitPhoto={this.submitPhoto}
                                        companySubmitHandler={this.companySubmitHandler} />
                    :
                    <Profile technician={this.state.technician}
                             currentUser={this.state.currentUser}
                             />
                
          } />

          <Route  path = '/' render = {() => 
                <div id="flex-container"> 
                    <CompaniesContainer/>
                    <TechniciansContainer currentUser={this.state.currentUser} 
                                          clickHandler={this.clickHandler} /> 
                </div>
           } /> 
       </Switch>      
    </div>
  );
 }
}

export default withRouter(App);
