import React from 'react';
import './App.css';
import TechniciansContainer from './Containers/TechniciansContainer';
import CompaniesContainer from './Containers/CompaniesContainer';
import CurrentUserProfile from "./Containers/CurrentUserProfile";
import NavBar from './Components/NavBar';
import Signup from './Components/Signup';
import Home from './Components/Home';
import { Route, Switch, withRouter} from 'react-router-dom';

class App extends React.Component {

  state={
    currentUser: null, 
    failMessage: ""
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
            fetch(`https://nycable.herokuapp.com/users/${this.state.currentUser.id}`, options)
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
        fetch('https://nycable.herokuapp.com/users', options)
        .then(response => response.json())
        .then(resp => {console.log("sign", resp)
          if (resp.user) {
              localStorage.setItem("token", resp.jwt) 
              this.setState({currentUser: resp.user, 
                             failMessage: "" }, ()=> this.props.history.push('/profile')
              )
          }
          else {this.setState({failMessage: {"error": "User with the same username already exists!" }
          })
          }
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
    
    fetch('https://nycable.herokuapp.com/login', options)  // got toket in response !
    .then(response => response.json())
    .then(resp =>{
        if (resp.user) {
            localStorage.setItem("token", resp.jwt) 
            this.setState({currentUser: resp.user,
                          failMessage: ""
                          }, ()=> this.props.history.push('/')
                          )
        }
        else { this.setState({failMessage: resp})
        }
    })
}

logoutHandler=()=>{
  localStorage.removeItem("token")
  this.setState({currentUser: null
  })
  this.props.history.push('/signup')  //redirecting to sign up 
}

submitPhoto = user => {
  console.log("g", user)
  // optimistic rendering new user picture
   let photo = {photo: user.user.photo}
   let updatedCurrentUser=Object.assign(this.state.currentUser, photo)
   this.setState({currentUser: updatedCurrentUser})
}

componentDidMount(){ 
  const token = localStorage.getItem("token")  
  if (token) {
       fetch(`https://nycable.herokuapp.com/profile`, {
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
         console.log("app", this.state.currentUser)
    return ( 
    <div>
      
       <NavBar currentUser={this.state.currentUser} logoutHandler={this.logoutHandler}/> 
      
       <Switch>
          <Route  path = '/signup' render = {() => <Signup  signUpHandler={this.signUpHandler}
                                                            loginHandler={this.loginHandler} 
                                                            message = {this.state.failMessage}/>
          } />

         
          <Route  path = '/profile' render = {() =>  this.state.currentUser ? 
                  <CurrentUserProfile  currentUser={this.state.currentUser}
                                       clickHandler={this.clickHandler}
                                       submitPhoto={this.submitPhoto}
                                       companySubmitHandler={this.companySubmitHandler} />
                  : <h1>LOADING</h1>                     

          } />

          <Route path = '/technicians' render = {() => 
                  <TechniciansContainer currentUser={this.state.currentUser}
                                        clickHandler = {this.clickHandler} />
           } />

          <Route  path = '/providers' render = {() =>                  
                  <CompaniesContainer currentUser={this.state.currentUser}/>                
           } /> 

          <Route  path = '/' render = {() =>                  
                  <Home/>                
           } />

       </Switch>      
    </div>
  );
 }
}

export default withRouter(App);
