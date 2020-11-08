import React, { Component } from 'react';
import Technician from '../Components/Technician';
import { Redirect} from 'react-router-dom';

class TechniciansContainer extends Component {

    state={
        technicians: [], 
        filtered:[],  
        city: "" , 
        company: ""
    }
    componentDidMount(){      
        fetch(`http://localhost:4000/technicians`)
        .then(response => response.json())
        .then(response => this.setState({technicians: response, filtered: response
                          })
        )
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
        .then(response => console.log("rating resp", response))
}  
      
    getTechnicians = () => {    
        return this.state.filtered.map(tech => < Technician id={tech.id} technician={tech}
                                                            currentUser={this.props.currentUser} 
                                                            clickHandler={this.props.clickHandler} />)
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
          console.log("Container technicians", this.state.technicians)
        return (
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

        );
    }
}

export default TechniciansContainer;




