/* global google */

import React from 'react'
import { Link } from 'react-router'
import axios from 'axios'

const nycStations = ['', '1', '2', '3', '4', '5', '6', '7', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'L', 'M', 'N', 'Q', 'R', 'S', 'W', 'Z']
// google.maps.geometry.spherical.computeDistanceBetween(a,b)
// to filter by nearest location upon clicking current location / typing in address

const StationsFilter = (props) => {
    // console.log(this.state)
    return (<div className="panel panel-default">
                  <div className="panel-heading">
                    Search New Location
                  </div>
                  <div className="panel-body">
                    <div className="input-group station-page-input">
                      <form onSubmit={props.captureGeoInput}>
                        <input
                          type="text"
                          className="form-control input-box"
                          placeholder="Enter Address for Nearby Elevator Access"
                          onChange={props.handleSearchChange} />
                        <span className="input-group-btn">
                          <button className="btn btn-default" type="submit">Search</button>
                        </span>
                      </form>
                    </div>
                    <div id="current-location-search">Current Location
                      <button className="btn btn-default" onClick={props.captureGeo}>
                        <span className="glyphicon glyphicon-search"></span>
                      </button>
                      <div className="input-group front-page-input">
                        <form>
                          <label>Select Your Subway Line</label>
                          <select onChange={props.handleChange}>
                            { nycStations.map(station => (<option key={station}>{station}</option>)) }
                          </select>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
    )
}

export default StationsFilter;
