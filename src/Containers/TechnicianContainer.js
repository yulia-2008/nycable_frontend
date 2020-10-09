import React, { Component } from 'react';
import Technician from '../Components/Technician';
import TechnicianForm from '../Components/TechnicianForm';

class TechnicianContainer extends Component {

    state={
        technicians: []
    }
    componentDidMount(){
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

    render() {console.log("Container")
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
<form>
Search Technician <br></br>&nbsp; 
  <select name="companies">
    <option value="Optimum">Optimum</option>
     <option value="Dish">Dish</option>
    <option value="Spectrum">Spectrum</option>
    <option value="Direct TV">Direct TV</option>
    <option value="Verizon">Verizon</option> 
 </select> 
 <br></br>
<input type="text" name="city" placeholder="City/Town"></input>
<br></br>
<input type="text"  name="name" placeholder="First and Last Name"></input>
<br></br>
<input type="submit"></input>
</form>

                {this.getTechnicians()}
            </div>
        );
    }
}

export default TechnicianContainer;
