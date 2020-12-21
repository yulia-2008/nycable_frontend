import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div id="background">
                <br/>
                <h2 id="left"> Welcome to NY Cable! </h2>
                 
                <div id="left">              
                    <b> Looking to switch Intervet & TV  service or just looking for a new service? </b>
                    <p> Here you can find all available Services in your area  <br/>as well as latest deals from providers.</p>

                    <b> Are you satisfied with your service?</b>
                    <p>Share your experience! <br/> Rate or write a review about your internet provider <br/> or technician that installed cable for you.</p>
                
                    <b>For technicians: </b>
                    <p>Register as a technician <br/> and get reviews from your clients.</p>
                
                    <b>Coming soon:</b> 
                    <p>Chat with technician! <br/>
                     FAQ 
                    </p>        
                </div>  
                <br/>             
            </div>
        );
    }
}

export default Home;
