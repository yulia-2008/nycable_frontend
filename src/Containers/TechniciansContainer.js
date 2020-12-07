import React, { Component } from 'react';
import Technician from '../Components/Technician';
import { Redirect} from 'react-router-dom';
import { Route, Switch} from 'react-router-dom';
import Profile from '../Components/Profile';

class TechniciansContainer extends Component {

    state={
        technicians:[], 
        filtered:[], 
        city: "" , 
        company: "",
        // user: null
    }
    componentDidMount(){  
        fetch(`http://localhost:4000/technicians`)
        .then(response => response.json())
        .then(response => {this.setState({ technicians: response, 
                                           filtered: response
                           })
        })
    }

    submitRating = (ratingNumber, user) => {
        let options = { method: 'POST',
                              headers: {
                              'Content-Type': 'application/json',
                               Accept: 'application/json'
                              },
                               body: JSON.stringify({
                                 rating: { user_id: this.props.currentUser.id,
                                           num: ratingNumber,
                                           subject_id: user.id,
                                           subject_type: "User",                                    
                                         }
                               })
        }
            fetch('http://localhost:4000/ratings', options)
            .then(response => response.json())
            .then(response => {
                let foundTechnician = this.state.technicians.find(tech => tech.id === user.id)
                foundTechnician.ratings=[...foundTechnician.ratings, {num: response.num, subject_id: user.id}]
                console.log("found Technician", foundTechnician)
            })
      }
            
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
    render() {
            console.log("technicians container ", this.state.technicians)
        return (

            <Switch> 
                {this.state.technicians.length === 0 ? 
                    <h1>LOADING</h1>
                    :
                    <Route  path = '/user/:id' render = {({match}) => {
                        let id = parseInt(match.params.id)   // id from params is a string
                        let foundUser = this.state.technicians.find((user) => user.id === id )         
                        return   <Profile user={foundUser}
                                        submitRating={this.submitRating}
                                    //  clickHandler={this.props.clickHandler}
                                        currentUser={this.props.currentUser}/>  
                    }} />
                }

                <Route path = '/' render ={() => 
                    <div id="right-container">
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
                        <input  type="search" name="city" placeholder="City/Town" onChange={this.changeHandler}></input>
                        &nbsp; &nbsp;
                        <input type="submit" value="Search"></input>
                        </form>
                        <br></br>
                        {this.getTechnicians()}
                        </div>       
                 }/>            
            </Switch>           
        );
    }
}

export default TechniciansContainer;




