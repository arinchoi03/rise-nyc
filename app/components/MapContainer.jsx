import React, { Component } from 'react'

// Components
import InitialMap from './InitialMap'

export default class MapContainer extends Component {
  render() {
    return (<InitialMap
            containerElement={
                <div style={{ height: '40vw', width: 'auto' }} />
              }
            mapElement={
              <div style={{ height: '40vh', width: '40vw' }} />
            }
            markers={this.props.markers}/>)
  }
}
