import React from 'react';
import logo from './logo.svg';
import './App.css';
import TechniciansContainer from './Containers/TechniciansContainer';
import CompaniesContainer from './Containers/CompaniesContainer';
import Profile from "./Containers/Profile";
import NavBar from './Components/NavBar';
import Signup from './Components/Signup';
import { Route, Switch} from 'react-router-dom';

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
            fetch(`http://localhost:3001/technicians/${this.state.currentUser.id}`, options)
            .then(response => response.json())
            .then(response => this.setState({currentUser: response})
            )
}

  signUpHandler = technicianObj => {
    // get token in response
    let options = { method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                    },
                    body: JSON.stringify({
                           technician: technicianObj
                    })
                   }
        fetch('http://localhost:3001/technicians', options)
        .then(response => response.json())
        .then(resp => { this.setState({currentUser: resp.user})
       
localStorage.setItem("token", resp.jwt) 
  })
 
  }


  render(){
    // console.log("app")
    return (
    <div className="App">
       <NavBar /> 
       <Switch>
       <Route exact path = '/signup' render = {() => <Signup  signUpHandler={this.signUpHandler} />} />
       <Route exact path = '/profile' render = {() => <Profile  currentUser={this.state.currentUser}
                                                                companySubmitHandler={this.companySubmitHandler} />} />
      <Route exact path = '/' render = {() => <div><TechniciansContainer/> 
                                                     <CompaniesContainer/></div>
                                                           } /> 
       </Switch>
      
      
    </div>
  );
 }
}

export default App;
