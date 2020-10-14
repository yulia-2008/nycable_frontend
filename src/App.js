import React from 'react';
import logo from './logo.svg';
import './App.css';
import TechniciansContainer from './Containers/TechniciansContainer';
import CompaniesContainer from './Containers/CompaniesContainer';

class App extends React.Component {
  render(){
    // console.log("app")
    return (
    <div className="App">
      <header >
         
      </header>
      <TechniciansContainer/>
      <CompaniesContainer/>
    </div>
  );
 }
}

export default App;
