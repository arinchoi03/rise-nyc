/* global google */

import React from 'react'

import AddressFilter from './AddressFilter'
import CurrentLocationFilter from './CurrentLocationFilter'
import StationsFilter from './StationsFilter'

const nycStations = ['', '1', '2', '3', '4', '5', '6', '7', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'L', 'M', 'N', 'Q', 'R', 'S', 'W', 'Z']
// google.maps.geometry.spherical.computeDistanceBetween(a,b)
// to filter by nearest location upon clicking current location / typing in address

const FilterPanel = (props) => {
    return (<div className="panel panel-default">
                  <div className="panel-heading">
                    <h5>Search A New Location</h5>
                  </div>
                  <div className="panel-body">
                    <AddressFilter
                      captureGeoInput={props.captureGeoInput}
                      handleSearchChange={props.handleSearchChange}
                    />
                    <CurrentLocationFilter
                      captureGeo={props.captureGeo}
                    />
                    <StationsFilter
                      handleChange={props.handleChange}
                    />
                  </div>
                </div>
    )
}

export default FilterPanel;
