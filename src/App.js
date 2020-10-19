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
    user: null
  }
  // componentDidMount(){
  // fetch(`https://www.cabletv.com/ny/brooklyn?zip=11223#internet`)
  // // .then(response => response.json())
  // .then(response => console.log(response))
  // }


  render(){
    // console.log("app")
    return (
    <div className="App">
       <NavBar /> 
       <Switch>
       <Route exact path = '/signup' render = {() => <Signup  user={this.state.user} />} />
       <Route exact path = '/profile' render = {() => <Profile  user={this.state.user} />} />
      <Route exact path = '/' render = {() => <div><TechniciansContainer/> 
                                                     <CompaniesContainer/></div>
                                                           } /> 
       </Switch>
      
      
    </div>
  );
 }
}

export default App;
