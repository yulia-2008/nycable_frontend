import React, { Component } from 'react';
import Technician from '../Components/Technician';
import { Redirect} from 'react-router-dom'; // might need later
import { Route, Switch} from 'react-router-dom';
import TechnicianReviews from '../Components/TechnicianReviews';

class TechniciansContainer extends Component {

    state={
        technicians:[], 
        filtered:[], 
        city: "" , 
        company: null,
    }
    componentDidMount(){  
        fetch(`https://nycable.herokuapp.com/technicians`)
        .then(response => response.json())
        .then(response => {this.setState({ technicians: response, 
                                           filtered: response
                           })
        })
    }

    submitRating = (ratingNumber, technician) => {
        let options = { method: 'POST',
                              headers: {
                              'Content-Type': 'application/json',
                               Accept: 'application/json'
                              },
                               body: JSON.stringify({
                                 rating: { user_id: this.props.currentUser.id,
                                           num: ratingNumber,
                                           subject_id: technician.id,
                                           subject_type: "User",                                    
                                         }
                               })
        }
            fetch('https://nycable.herokuapp.com/ratings', options)
            .then(response => response.json())
            .then(response => {
                let foundTechnician = this.state.technicians.find(tech => tech.id === technician.id)
                foundTechnician.ratings = [...foundTechnician.ratings, {num: response.num, subject_id: technician.id, user_id: this.props.currentUser.id}]
            })
      }

    submitReview = (technician, review) =>{
        let foundTechnician = this.state.technicians.find(tech => tech.id ===technician.id)
        foundTechnician.reviews = [...foundTechnician.reviews, {text: review}]
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
        this.setState({search: true})

        if (this.state.company === ""  && this.state.city === "") {
             this.setState({filtered: filtered})
        }
        if (this.state.company !== "" && this.state.city === "") {
           let filterByCompany = filtered.filter(tech => tech.company_name === this.state.company)
           this.setState({filtered: filterByCompany, selected: this.state.company})
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
            //  console.log("technicians container ", this.state.technicians)
        return (
            <div id="centered">
                            
                {this.state.technicians.length === 0 ? 
                    <h1>LOADING</h1>
                    :
                    <Switch>
                        <Route  path = '/technicians/:id' render = {({match}) => {
                            let id = parseInt(match.params.id)   // id from params is a string
                            let foundUser = this.state.technicians.find((user) => user.id === id )         
                            return  <div id="centered"> 
                                        <TechnicianReviews  user={foundUser}
                                                        currentUser={this.props.currentUser}
                                                        submitReview={this.submitReview}
                                                        submitRating={this.submitRating} /> 
                                    </div> 
                        }} />
                
                        <Route path = '/technicians' render ={() => 
                            <>
                                <br></br>
                                <div id="centered">
                                    <form onSubmit = {event => this.searchHandler(event)}>
                                        <select name="company" onChange={this.changeHandler}>
                                            <option value=""> All Companies </option>
                                            {/* attribute selected needed for: After going back from technician reviews to technicians - you go back to your last search results */}
                                            <option value="Optimum" selected={"Optimum"===this.state.company} >Optimum</option> 
                                            <option value="Dish" selected={"Dish"===this.state.company}>Dish</option>
                                            <option value="Spectrum" selected={"Spectrum"===this.state.company}>Spectrum</option>
                                            <option value="Direct TV" selected={"Direct TV"===this.state.company}>Direct TV</option>
                                            <option value="Verizon" selected={"Verizon"===this.state.company}>Verizon</option> 
                                        </select> 
                                        &nbsp; &nbsp;
                                        <input  type="search" name="city" placeholder="City/Town"  value={this.state.city} onChange={this.changeHandler}></input>
                                        &nbsp; &nbsp;
                                        <input type="submit" value="Search"></input>
                                    </form>
                                </div>
                                <br></br>

                                <div className="grid-container">
                                    {this.getTechnicians()}
                                </div>
                            </> 
                        }/>            
                    </Switch>  
                }
            </div>           
        );
    }
}

export default TechniciansContainer;




