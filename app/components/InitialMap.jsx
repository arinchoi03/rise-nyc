import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import React from 'react'

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap

// what are the props that  I'm passing donw?
// - onMapClick, onMarkerRightClick(index)
const InitialMap = withGoogleMap(props => {
  console.log('props in initialMap', props)
  return (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={{ lat: 40.7359002, lng: -73.9911824 }} // input by user at beginning
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
