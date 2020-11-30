import React, { Component } from 'react';
import Company from "../Components/Company";
import CompanyReviews from "../Components/CompanyReviews";
import { Route, Switch} from 'react-router-dom';



class CompaniesContainer extends Component {
    state ={
        companiesArray: []
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
                <Switch> 
                    <Route  path = '/user/:id' render = {() =>              
                        <>  
                        <h2> Companies</h2>
                        {this.renderCompanies()} 
                        </>                                                    
                    }/>

                    {this.state.companiesArray.length === 0 ? 
                        <h1>LOADING</h1>
                        :
                        <Route  path = '/:company' render = {({match}) => {
                            let name = match.params.company   // id from params is a string
                            let foundCompany = this.state.companiesArray.find((com) => com.name === name )         
                            // return  < CompanyReviews company={foundCompany}                 
                            //                         currentUser={this.props.currentUser}/>  
                            return  < CompanyReviews company={foundCompany}                 
                                                    currentUser={this.props.currentUser}/> 

                        }}/>
                    }

                    <Route  path = '/' render = {() =>
                        <>  
                        <h2> Companies</h2>
                        {this.renderCompanies()} 
                        </>                                                    
                    }/>

      
                     
               
                </Switch>
            </div>
        );
    }
}

export default CompaniesContainer;
