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
        return this.state.filtered.map(tech => < Technician id={tech.id} technician={tech} clickHandler={this.props.clickHandler}/>)
    }
        
    

    // submitTechnicianHandler = (event, technician) => {event.preventDefault()
    //     let options = { method: 'POST',
    //                 headers: {
    //                 'Content-Type': 'application/json',
    //                 Accept: 'application/json',
    //                 // Authorization: `Bearer ${token}`
    //                 },
    //                 body: JSON.stringify({
    //                        technician: {first_name: technician.firstName,                               
    //                              last_name: technician.lastName,
    //                              rating: 0,   
    //                              company_name: technician.company,                                                            
    //                              city: technician.city
    //                       }
    //                 })
    //                }
    //     fetch('http://localhost:3001/technicians', options)
    //     .then(response => response.json())
    //     .then(response => this.setState({technicians: [...this.state.technicians, response]
    //                       })
    //     )
    //     event.target.reset()       
    // }

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
        //    console.log("Container")
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




