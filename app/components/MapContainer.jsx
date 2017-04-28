import React from 'react'

// Components
import InitialMap from './InitialMap'

export default class MapContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: [{lat: 40.6944, lng: -73.9213}]
    }
  }
  render() {
    return (<InitialMap
              containerElement={
                <div style={{ height: '40vw', width: 'auto' }} />
              }
            mapElement={
              <div style={{ height: '40vh', width: '40vw' }} />
            }
            markers={this.state.markers}/>)
  }
}
