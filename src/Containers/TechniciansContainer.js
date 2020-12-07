import React, { Component } from 'react';
import Technician from '../Components/Technician';
import { Redirect} from 'react-router-dom';
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
        fetch(`http://localhost:4000/technicians`)
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
            fetch('http://localhost:4000/ratings', options)
            .then(response => response.json())
            .then(response => {
                let foundTechnician = this.state.technicians.find(tech => tech.id === technician.id)
                foundTechnician.ratings = [...foundTechnician.ratings, {num: response.num, subject_id: technician.id}]
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
            console.log("technicians container ", this.state.technicians)
        return (

            <Switch> 
                {this.state.technicians.length === 0 ? 
                    <h1>LOADING</h1>
                    :
                    <Route  path = '/technician/:id' render = {({match}) => {
                        let id = parseInt(match.params.id)   // id from params is a string
                        let foundUser = this.state.technicians.find((user) => user.id === id )         
                        return   <TechnicianReviews user={foundUser}
                                                    currentUser={this.props.currentUser}
                                                    submitReview={this.submitReview}
                                                    submitRating={this.submitRating} />  
                    }} />
                }

                <Route path = '/' render ={() => 
                    <div id="right-container">
                        <h2>Technicians </h2>
                        <form onSubmit = {event => this.searchHandler(event)}>
                        <select name="company" onChange={this.changeHandler}>
                            <option value=""> All Companies </option>
                                {/* attribute selected needed for: After going back from technician reviews to technicians so you can see your last search results */}
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
                        <br></br>
                        {this.getTechnicians()}
                        </div>       
                 }/>            
            </Switch>           
        );
    }
}

export default TechniciansContainer;




