import React from 'react';
import './App.css';
import TechniciansContainer from './Containers/TechniciansContainer';
import CompaniesContainer from './Containers/CompaniesContainer';
import Profile from "./Containers/Profile";
import NavBar from './Components/NavBar';
import Signup from './Components/Signup';
import { Route, Switch, withRouter} from 'react-router-dom';

class App extends React.Component {

  state={
    currentUser: null
  }
  // componentDidMount(){
  // fetch(`https://www.cabletv.com/ny/brooklyn?zip=11223#internet`)
  // // .then(response => response.json())
  // .then(response => console.log(response))
  // }
  
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

loginHandler = userInfo =>{console.log("login", this.props )
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
  // if need to redirect to login page :
  //  else {
  //    this.props.history.push('/signup')
  //  }  


}
  render(){
      // console.log("app", this.props)
    return ( 
    <div className="App">

       <NavBar currentUser={this.state.currentUser} logoutHandler={this.logoutHandler}/> 

       <Switch>
          <Route  path = '/signup' render = {() => <Signup  signUpHandler={this.signUpHandler}
                                                            loginHandler={this.loginHandler} />} />
          <Route  path = '/profile' render = {() => <Profile  currentUser={this.state.currentUser}
                                                              companySubmitHandler={this.companySubmitHandler} />} />
          <Route  path = '/' render = {() => <div><TechniciansContainer currentUser={this.state.currentUser} /> 
                                                  <CompaniesContainer/></div>
                                                           } /> 
       </Switch>      
    </div>
  );
 }
}

export default withRouter(App);
