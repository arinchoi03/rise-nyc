import React from 'react'

const CurrentLocationFilter = (props) => {
  return (
          <div id="current-location-search">Current Location
            <button className="btn btn-default" onClick={props.captureGeo}>
              <span className="glyphicon glyphicon-search"></span>
            </button>
          </div>

  )
}

export default CurrentLocationFilter;
