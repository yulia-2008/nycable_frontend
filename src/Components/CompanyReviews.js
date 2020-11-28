import React, { Component } from 'react';

class CompanyReviews extends Component {
    renderReviews = () => {
      return  this.props.company.reviews.map(rev => <li> {rev.user.first_name} {rev.user.last_name} : {rev.text}</li>)
    }
    render() {
        // console.log("h" , this.props.company)
        return (
            <div>
                <h1>{this.props.company.name}</h1>
                <p>Rate and review</p>
               <ul>{this.renderReviews()}</ul> 
            </div>
        );
    }
}

export default CompanyReviews;
