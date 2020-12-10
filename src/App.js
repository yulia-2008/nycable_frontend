import React from 'react';
import './App.css';
import TechniciansContainer from './Containers/TechniciansContainer';
import CompaniesContainer from './Containers/CompaniesContainer';
import CurrentUserProfile from "./Containers/CurrentUserProfile";
import NavBar from './Components/NavBar';
import Signup from './Components/Signup';
import { Route, Switch, withRouter} from 'react-router-dom';

class App extends React.Component {

  state={
    currentUser: null, 
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
        this.setState({currentUser: resp.user},
          ()=> this.props.history.push('/')
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
}

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
        // console.log("app", this.state.user)
    return ( 
    <div>
        <div id="nav-bar">
       <NavBar currentUser={this.state.currentUser} logoutHandler={this.logoutHandler}/> 
      </div>
       <Switch>
          <Route  path = '/signup' render = {() => <Signup  signUpHandler={this.signUpHandler}
                                                            loginHandler={this.loginHandler} />
          } />

         
          <Route  path = '/profile' render = {() =>  this.state.currentUser ? 
                  <CurrentUserProfile  currentUser={this.state.currentUser}
                                       clickHandler={this.clickHandler}
                                       submitPhoto={this.submitPhoto}
                                       companySubmitHandler={this.companySubmitHandler} />
                  : <h1>LOADING</h1>                     

          } />

          <Route  path = '/' render = {() => 
                <div id="flex"> 
                    <CompaniesContainer currentUser={this.state.currentUser}/>
                    <TechniciansContainer currentUser={this.state.currentUser}
                                          clickHandler = {this.clickHandler}
                                          /> 
                </div>
           } /> 
       </Switch>      
    </div>
  );
 }
}

export default withRouter(App);
