import React, { Component } from 'react';
import Company from "../Components/Company"



class CompaniesContainer extends Component {
    state ={
        companiesArray:[]
    }

    componentDidMount(){
        fetch(`http://localhost:4000/companies`)
        .then(response => response.json())
        .then(response => this.setState({companiesArray: response
                          })
        )
    }

    renderCompanies = () => {    
     return this.state.companiesArray.map((company) =>  <Company key={company.id} company={company} currentUser={this.props.currentUser}/>)
    }

    render() {
        // console.log(this.state.companiesArray)
        return (
            <div id="left-container">
                <h2> Companies</h2>
                {this.renderCompanies()}
            </div>
        );
    }
}

export default CompaniesContainer;
