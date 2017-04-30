import React from 'react'
import { Link } from 'react-router'
// navigator.getGeolocation?

const FrontPage = props => {
  // console.log(props.auth) // attach 'currentAddress' when search button/current loc clicked
  return (
  <div>
    <header id="top" className="header">
      <div className = "text-vertical-center">
        <h1><Link to="/stations">RISE UP</Link></h1>
        <h2>NYC</h2>
        <h4>Find help to get you to elevator access</h4>
        <h4>...and help someone else</h4>
          <div className="col-lg-2">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Enter Address for Nearby Elevator Access" />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">Go!</button>
              </span>
            </div>
          </div>
          <div id="current-location-search">Current Location
            <button className="btn btn-default">
              <span className="glyphicon glyphicon-search"></span>
            </button>
          </div>
      </div>
    </header>
  </div>
  )
}

export default FrontPage
