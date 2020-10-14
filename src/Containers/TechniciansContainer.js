import React, { Component } from 'react';
import Technician from '../Components/Technician';
import TechnicianForm from '../Components/TechnicianForm';

class TechniciansContainer extends Component {

    state={
        technicians: [], 
        filtered:[],  
        city: "" , 
        company: ""
    }
    componentDidMount(){this.fetchTechnicians()       
    }

    fetchTechnicians = () =>{
        fetch(`http://localhost:4000/technicians`)
        .then(response => response.json())
        .then(response => this.setState({technicians: response, filtered: response
                          })
        )
    }

    getTechnicians = () => {    
        return this.state.filtered.map(tech => < Technician key={tech.id} technician={tech}/>)
    }
        
    

    submitTechnicianHandler = (event, technician) => {event.preventDefault()
        let options = { method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    // Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                           technician: {first_name: technician.firstName,                               
                                 last_name: technician.lastName,
                                 rating: 0,   
                                 company_name: technician.company,                                                            
                                 city: technician.city
                          }
                    })
                   }
        fetch('http://localhost:4000/technicians', options)
        .then(response => response.json())
        .then(response => this.setState({technicians: [...this.state.technicians, response]
                          })
        )
        event.target.reset()       
    }

    changeHandler = event => {this.setState({[event.target.name]: event.target.value})
    }


    searchHandler = event => {event.preventDefault()
        let filtered = [...this.state.technicians]

        if (this.state.company === ""  && this.state.city === "") {
             this.setState({filtered: filtered})
        }
        if (this.state.company !== "" && this.state.city === "") {
           filtered = filtered.filter(tech => tech.company_name === this.state.company)
           this.setState({filtered: filtered})
        } 
        if (this.state.company === "" && this.state.city !== "") {
            filtered = filtered.filter(tech => tech.city === this.state.city)
            this.setState({filtered: filtered})
         } 
         if (this.state.company !== "" && this.state.city !== "") {
            filtered = filtered.filter(tech => tech.city === this.state.city && tech.company_name === this.state.company)
            this.setState({filtered: filtered})
         }
    
} 

    render() {
          console.log("Container", this.state.technicians)
        return (
            <div>
            <TechnicianForm submitTechnicianHandler={this.submitTechnicianHandler}/>

            <form onSubmit = {event => this.searchHandler(event)}>
                Search Technician <br></br>&nbsp; 
                <select name="company" onChange={this.changeHandler}>
                    <option value=""> All Companies </option>
                    <option value="Optimum">Optimum</option>
                    <option value="Dish">Dish</option>
                    <option value="Spectrum">Spectrum</option>
                    <option value="Direct TV">Direct TV</option>
                    <option value="Verizon">Verizon</option> 
                </select> 
                <br></br>
                <input type="text" name="city" placeholder="City/Town" onChange={this.changeHandler}></input>
                <br></br>
                <input type="submit" value="Search"></input>
            </form>

            {this.getTechnicians()}
               
            </div>
        );
    }
}

export default TechniciansContainer;



