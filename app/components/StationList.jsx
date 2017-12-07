import React from 'react'
import { Link } from 'react-router'
// navigator.getGeolocation?

const StationList = (props) => {
  return (
    <div className="rounded stationInfo col-md-6 col-sm-12">
      <div className ="panel panel-default">
        <div className="panel-heading">
          <h5>Stations List</h5>
        </div>
        <div className="panel-body">
          {props.stations.map(station => {
            return (station)
          }
          )}
        </div>
      </div>
    </div>
  )
}

export default StationList
