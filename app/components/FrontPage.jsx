import React from 'react'
import { Link } from 'react-router'
// navigator.getGeolocation?

const FrontPage = (props) => {
  return (
    <div>
      <header id="top" className="header">
        <div className = "text-vertical-center">
          <h1><Link to="/stations">RISE UP</Link></h1>
          <h2>NYC</h2>
          <h4>Find help to get you to elevator access</h4>
          <h4>...and help someone else</h4>
            <div>
              <div className="input-group front-page-input">
                <input type="text" className="form-control front-page-box" placeholder="Enter Address for Nearby Elevator Access" />
                  <button className="btn btn-default" type="button">Search</button>
              </div>
            </div>
            <div id="current-location-search">Current Location
            <Link to ="/stations">
                <button className="btn btn-default" onClick={props.captureGeo} >
                  <span className="glyphicon glyphicon-search"></span>
              </button>
              </Link>
            </div>
        </div>
      </header>
    </div>
    )
}

export default FrontPage
