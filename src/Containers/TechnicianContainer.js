import React, { Component } from 'react';
import Technician from '../Components/Technician';
import TechnicianForm from '../Components/TechnicianForm';

class TechnicianContainer extends Component {

    state={
        technicians: [],      
        company: "",
        city: "" 
    }
    componentDidMount(){this.fetchTechnicians()       
        // console.log("did mount")
    }

    fetchTechnicians = () =>{
        fetch(`http://localhost:4000/technicians`)
        .then(response => response.json())
        .then(response => this.setState({technicians: response
                          })
        )
    }

    getTechnicians = () => { return this.state.technicians.map(tech => < Technician key={tech.id} technician={tech}/>)
    
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

    changeHandler = event => {this.setState({ [event.target.name]: event.target.value})
    // console.log("onchange", this.state.company)
   
}

searchHandler = event => {event.preventDefault()
   console.log("filtered", this.state)
    let filtered = [...this.state.technicians]
    
 if (this.state.company !=="" && this.state.city ==="") {
      filtered = filtered.filter(tech => tech.company_name === this.state.company)
      console.log("oj", filtered)
 }
 if (this.state.city !=="" && this.state.company ==="") {
    filtered = filtered.filter(tech => tech.city === this.state.city)
}
if (this.state.city !=="" && this.state.company !=="") {
    filtered = filtered.filter(tech => tech.city === this.state.city && tech.company_name === this.state.company)
}

 this.setState({technicians: filtered})
//  event.target.reset() 

}


    render() {
          console.log("Container", this.state.technicians)
        return (
            <div>
            <TechnicianForm submitTechnicianHandler={this.submitTechnicianHandler}/>

              {/* <form onSubmit={this.submitHandler}>
                    <input  
                        type="text"
                        placeholder={"Search for company"}
                        onChange={this.changeHandler}
                        value={this.state.search}
                    />
                    <button type='submit'>search</button>
                </form>   */}
<form onSubmit = {event => this.searchHandler(event)}>
Search Technician <br></br>&nbsp; 
  <select name="company" onChange={this.changeHandler}>
    <option value="">Choose Company</option>
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

export default TechnicianContainer;




