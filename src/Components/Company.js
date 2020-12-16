import React, { Component } from 'react';
import Rating from 'material-ui-rating'
import { NavLink } from 'react-router-dom';
import phone from "../phone.png";

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
            <div id="flex-company">
                <div id="flex-box">                      
                    <img id="logo" src={this.props.company.logo} alt={this.props.company.name}></img> 
                    <div id="flex">
                        <p >{this.averageRating().toFixed(1)} </p>
                        <Rating name="half-rating" value={this.averageRating()} readOnly="true" precision={0.5}  size="small"/>
                     </div> 

                    <NavLink to={`providers/${this.props.company.name}`}> 
                       {this.props.company.reviews.length} reviews
                    </NavLink>&nbsp; &nbsp;
                </div>

                <div id="flex-box">
                    {this.props.company.internet_plan ? 
                        <p>Cheapest Internet Plan &nbsp; <b>{this.props.company.internet_plan.toFixed(2)} /mo</b> , <b>{this.props.company.speed} mbps</b></p>
                        :
                        null
                    }

                    {this.props.company.tv_plan ?
                        <p>Cheapest TV Plan &nbsp; <b>{this.props.company.tv_plan.toFixed(2)} /mo</b></p>
                        :
                        null
                    }

                    {this.props.company.internet_tv_plan ?
                        <p>Internet + TV &nbsp; <b>{this.props.company.internet_tv_plan.toFixed(2)} /mo  ({this.props.company.number_of_channels}+ chanells)</b></p>
                        :
                        null 
                    }

                    {this.props.company.special_offer? 
                        <>
                        Special offer 
                        <p id="frame">
                            &nbsp; {this.props.company.special_offer} &nbsp; 
                        </p>
                        </>

                        :null
                    }
                    
                    <a href={this.props.company.plans_link}> <h3 id="no-margin">More plans</h3> </a> <br></br>
                    <span id="text-centered">
                         <img id="phone-icon" src={phone} alt="phone icon"></img> {this.props.company.phone}
                    </span>
                </div>

                <img id="flex-box" src={this.props.company.coverage_map} alt="coverage map"></img>

            </div>
        );
    }
}

export default Company;
