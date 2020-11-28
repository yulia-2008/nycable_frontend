import React, { Component } from 'react';
import Rating from 'material-ui-rating'
import { NavLink } from 'react-router-dom';

class Company extends Component {
    averageRating = () => {
        let average = 0; 
        if (this.props.company.ratings.length >=1) {
            let ratingsQuantity = this.props.company.ratings.length;
            let sum = 0;
            for ( let i = 0; i < ratingsQuantity; i++)
                { sum += this.props.company.ratings[i].num }
            average =  sum / ratingsQuantity                 
        }
        return average
        }

    render() {
        // console.log("company", this.props)
        return (
            <div id="company">
                <h3> {this.props.company.name} </h3>

                <div id="flex">
                    <p id="rating-centered">Rating {this.averageRating().toFixed(1)}</p>
                    <Rating name="half-rating" value={this.averageRating()} readOnly="true" precision={0.5}  size="small"/>
                </div> 


                 <NavLink to={`/${this.props.company.name}`}> 
                       {this.props.company.reviews.length} reviews
                   </NavLink>&nbsp; &nbsp;
            </div>

        );
    }
}

export default Company;
