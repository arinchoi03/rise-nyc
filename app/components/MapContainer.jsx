import React, { Component } from 'react'

// Components
import InitialMap from './InitialMap'

export default class MapContainer extends Component {
  render() {
    // console.log('markers in map container', this.props.markers)
    return (<InitialMap
            containerElement={
                <div style={{ height: '100%', width: '100%' }} />
              }
            mapElement={
              <div style={{ height: '500px', width: '500px' }} />
            }
            markers={this.props.markers}/>)
  }
}
