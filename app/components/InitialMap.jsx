import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import React from 'react'

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap

// what are the props that  I'm passing donw?
// - onMapClick, onMarkerRightClick(index)
const InitialMap = withGoogleMap(props => {
  console.log('markers in initialMap', props.markers)
  return (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={{ lat: 40.6944, lng: -73.9213 }} // input by user at beginning
    onClick={props.onMapClick}
  >
    {props.markers && props.markers.map((marker, index) => (
      <Marker
        position={{lat: marker.lat, lng: marker.lng}}
      />
    ))}
  </GoogleMap>
  )
})

export default InitialMap
