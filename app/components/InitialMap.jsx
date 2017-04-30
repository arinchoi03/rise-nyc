import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import React from 'react'

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap

// what are the props that  I'm passing donw?
// - onMapClick, onMarkerRightClick(index)
const InitialMap = withGoogleMap(props => {
  // console.log('props in initialMap', props)
  const currentPos = props.currentPos
  console.log(currentPos)
  let lat, lng
  if (!currentPos || !currentPos.length) {
    lat = 40.7554778
    lng = -73.981885
  } else {
    lat = currentPos[0]
    lng = currentPos[1]
    console.log('latitude', lat, 'longitude', lng) // not resetting current loc
  }
  return (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={16}
    defaultCenter={{ lat: lat, lng: lng }} // input by user at beginning
    onClick={props.onMapClick}
  >
    { Array.isArray(props.markers) ? props.markers && props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={{lat: marker.lat, lng: marker.lng}}
      />
    )) : <Marker
              position={{lat: props.markers.lat, lng: props.markers.lng}}/>
    }
  </GoogleMap>
  )
})

export default InitialMap
