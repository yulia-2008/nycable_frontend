import React, { Component } from 'react';
import Technician from '../Components/Technician';
import { Redirect} from 'react-router-dom';
import { Route, Switch, withRouter} from 'react-router-dom';
import Profile from '../Components/Profile';

class TechniciansContainer extends Component {

    state={
        allUsers: [], 
        technicians:[], 
        fitered:[], 
        city: "" , 
        company: "",
        user: null
    }
    componentDidMount(){  
        fetch(`http://localhost:4000/users`)
        .then(response => response.json())
        .then(response => {let technicians = response.filter((t)=> t.role === "technician");
                           this.setState({ allUsers: response, 
                                           technicians: technicians, 
                                           filtered: technicians
                           })
    })
}
            
                  
        
        // fetch(`http://localhost:4000/technicians`)
        // .then(response => response.json())
        // .then(response => this.setState({ technicians: response, filtered: response
        //                   })
        // )

      
    getTechnicians = () => {    
        return this.state.filtered.map(tech => < Technician key={tech.id} technician={tech}
                                                            currentUser={this.props.currentUser} 
                                                            />)
    }
        
    changeHandler = event => {this.setState({[event.target.name]: event.target.value})
    }


    searchHandler = event => {event.preventDefault()
        let filtered = [...this.state.technicians]

        if (this.state.company === ""  && this.state.city === "") {
             this.setState({filtered: filtered})
        }
        if (this.state.company !== "" && this.state.city === "") {
           let filterByCompany = filtered.filter(tech => tech.company_name === this.state.company)
           this.setState({filtered: filterByCompany})
        } 
        if (this.state.company === "" && this.state.city !== "") {
            let filterByCity = filtered.filter(tech => tech.city.toLowerCase() === this.state.city.toLowerCase())
            this.setState({filtered: filterByCity})
         } 
         if (this.state.company !== "" && this.state.city !== "") {
            let filterByBoth = filtered.filter(tech => tech.city.toLowerCase() === this.state.city.toLowerCase()
                                                        && tech.company_name === this.state.company)
            this.setState({filtered: filterByBoth})
         }
    
} 
clickHandler = user => {
    this.setState({user: user})
}

    render() {
        //    console.log("technicians container ", this.state.technicians)
        return (
            this.state.allUsers.length === 0 ? <h1>LOADING</h1>:
            <>
            <Switch>       
                <Route  path = '/user/:id' render = {({match}) => {
                    let id = parseInt(match.params.id)   // id from params is a string
                    let foundUser = this.state.allUsers.find((user) => user.id === id )         
                    return   <Profile user={foundUser}
                                     clickHandler={this.props.clickHandler}
                                     currentUser={this.props.currentUser}/>  
                }                                                     
                } />
                <Route path = '/' render ={() => 
                    <div id="app-container">
                        <h2>Technicians </h2>
                        <form onSubmit = {event => this.searchHandler(event)}>
                        <select name="company" onChange={this.changeHandler}>
                            <option value=""> All Companies </option>
                            <option value="Optimum">Optimum</option>
                            <option value="Dish">Dish</option>
                            <option value="Spectrum">Spectrum</option>
                            <option value="Direct TV">Direct TV</option>
                            <option value="Verizon">Verizon</option> 
                        </select> 
                        &nbsp; &nbsp;
                        <input type="text" name="city" placeholder="City/Town" onChange={this.changeHandler}></input>
                        &nbsp; &nbsp;
                        <input type="submit" value="Search"></input>
                        </form>
                        <br></br>
                        {this.getTechnicians()}
                        </div>       
                 }/>            
            </Switch>
            </>
           
        );
    }
}

export default TechniciansContainer;




