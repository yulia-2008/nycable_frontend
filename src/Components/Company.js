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
        //   console.log("company", this.props)
        return (
            <div id="company">
                <div id="padding">     
                    <img id="logo" src={this.props.company.logo}></img> 

                    <div id="flex">
                        <p id="rating-centered">{this.averageRating().toFixed(1)}</p>
                        <Rating name="half-rating" value={this.averageRating()} readOnly="true" precision={0.5}  size="small"/>
                     </div> 


                    <NavLink to={`/${this.props.company.name}`}> 
                       {this.props.company.reviews.length} reviews
                    </NavLink>&nbsp; &nbsp;
                </div>

                <div id="padding">
                    <p>Cheapest Internet Plan : <b>{this.props.company.internet_plan} / mo</b></p>
                    <p>Internet + TV Plan : <b>{this.props.company.internet_tv_plan} /mo </b></p>
                    <p>Fastest speed : <b>{this.props.company.speed} mbps</b></p>
                </div>

                <div id="padding">
                <p>Areas of coverage:</p>
                <p className="tooltip">Manhattan <span className="tooltiptext"><p id="no-margin">Bushwick</p><p id="no-margin">Bensonhurst</p> <p id="no-margin">Red Hook</p></span> </p>
                <p className="tooltip">Brooklyn</p>
                <p className="tooltip">Bronx</p>
                <p className="tooltip">Queens</p>
                <p className="tooltip">Staten Island</p>
                </div>

                <div id="padding">
                    <br></br>
                    <a href={this.props.company.plans_link}> More info </a>
                </div>

            </div>
        );
    }
}

export default Company;
