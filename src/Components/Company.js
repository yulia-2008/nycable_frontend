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
           console.log("company", this.props)
        return (
            <div id="company">
                <div id="padding"> 
                     
                    <img id="logo" src={this.props.company.logo} alt={this.props.company.name}></img> 

                    <div id="flex">
                        <p id="rating-centered">{this.averageRating().toFixed(1)}</p>
                        <Rating name="half-rating" value={this.averageRating()} readOnly="true" precision={0.5}  size="small"/>
                     </div> 


                    <NavLink to={`/${this.props.company.name}`}> 
                       {this.props.company.reviews.length} reviews
                    </NavLink>&nbsp; &nbsp;
                </div>

                <div id="padding">
                    <p>Cheapest Internet Plan &nbsp; <b>{this.props.company.internet_plan.toFixed(2)} /mo</b> , <b>{this.props.company.speed} mbps</b></p>
                    <p>Internet + TV &nbsp; <b>{this.props.company.internet_tv_plan.toFixed(2)} /mo  ({this.props.company.number_of_channels}+ chanells)</b></p>
                    <p>Special offer: {this.props.company.special_offer}</p>
                    <a href={this.props.company.plans_link}> More plans </a>
                    <p>Connect: {this.props.company.phone}</p>
                </div>

                <img id="map" src={this.props.company.coverage_map} alt="coverage map"></img>

            </div>
        );
    }
}

export default Company;
