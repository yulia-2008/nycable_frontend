import React, { Component } from 'react';
import Company from "../Components/Company";
import CompanyReviews from "../Components/CompanyReviews";
import { Route, Switch} from 'react-router-dom';



class CompaniesContainer extends Component {
    state ={
        companiesArray: []
    }

    componentDidMount(){
        fetch(`https://nycable.herokuapp.com/companies`)
        .then(response => response.json())
        .then(response => this.setState({companiesArray: response
                          })
        )
    }

    renderCompanies = () => {    
     return this.state.companiesArray.map((company) =>  <Company key={company.id} company={company} currentUser={this.props.currentUser}/>)
    }

    submitRating = (ratingNumber, company) => {
        let options = { method: 'POST',
                              headers: {
                              'Content-Type': 'application/json',
                               Accept: 'application/json'
                              },
                               body: JSON.stringify({
                                 rating: { user_id: this.props.currentUser.id,
                                           num: ratingNumber,
                                           subject_id: company.id,
                                           subject_type: "Company",                                    
                                         }
                               })
                             }
              fetch('https://nycable.herokuapp.com/ratings', options)
              .then(response => response.json())
              .then(response => {
                  let foundCompany = this.state.companiesArray.find(comp => comp.id === company.id)
                  foundCompany.ratings=[...foundCompany.ratings, {num: response.num, subject_id: company.id}]
              })
      }


    render() {
        //   console.log("companies container", this.state.companiesArray)
        return (
            
            <div id="centered">                                                                
                    {this.state.companiesArray.length === 0 ? 
                        <h1>LOADING</h1>
                        : 
                        <Switch>
                            <Route  path = '/providers/:company' render = {({match}) => {
                                    let name = match.params.company   // data from params is a string
                                    let foundCompany = this.state.companiesArray.find((com) => com.name === name )         
                            
                                    return  <CompanyReviews company={foundCompany} 
                                                            submitRating={this.submitRating}                
                                                            currentUser={this.props.currentUser}/> 
                            }}/>

                            <Route  path = '/providers' render = {() => {
                                return <> {this.renderCompanies()} 
                                        <p> *Prices does not include taxes, equipment rentals, instalation fee and other charges.</p>
                                       </>                          
                            }
                            }/>  
                        </Switch>   
                    } 
                                                           
            </div>
        );
    }
}

export default CompaniesContainer;
