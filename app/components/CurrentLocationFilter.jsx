import React from 'react'

const CurrentLocationFilter = (props) => {
  return (
    <div id="current-location-search">
      <div>Current Location</div>
      <button className="btn btn-default" onClick={props.captureGeo}>
        <i className="fa fa-search"></i>
      </button>
    </div>

  )
}

export default CurrentLocationFilter;
