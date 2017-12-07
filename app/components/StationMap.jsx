import React from 'react'
import MapContainer from './MapContainer'

const StationMap = (props) => {
  // current station object
  const value = props.value

  // generates station info (name at this point)
  function generateStation(station) {
    const result = []
    for (var i in station) {
      const current = station[i]
      result.push(<div key={current.id}><h2>{current.name}</h2></div>)
    }
    return result
  }

  // generates marker for this station
  function generateMarkers(station) {
    const result = []
    for (var i in station) {
      const current = station[i]
      result.push(current.location)
    }
    return result
  }

  function generateCurrentLoc(station) {
    const result = []
    for (var i in station) {
      const lat = station[i].location.lat
      const lng = station[i].location.lng
      result.push(lat)
      result.push(lng)
    }
    return result
  }

  return (
    <div className="col-md-6 col-sm-12">
      <div className="panel panel-default current-log">
        <div className="panel-heading">
          {generateStation(value)}
        </div>
        <div className="panel-body">
          <MapContainer markers={generateMarkers(value)} currentPos={generateCurrentLoc(value)}/>
        </div>
      </div>
    </div>
  )
}

export default StationMap
