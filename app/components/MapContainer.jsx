import React, { Component } from 'react'
import { SearchBox } from 'react-google-maps'

// Components
import InitialMap from './InitialMap'

export default class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state= {
      center: [],
      markers: [],
    }
  }
  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent to us by our parent component change,
    // start listening to the new firebase reference.
    this.setState({
      center: incoming.currentPos, // returns an array
      markers: incoming.markers
    })
  }
  render() {
    console.log('mapcontainer markers', this.state.markers)
    console.log('mapcontainer center', this.state.center)
    return (<InitialMap
            containerElement={
                <div style={{ height: '100%', width: '100%' }} />
              }
            mapElement={
              <div style={{ height: '500px', width: '500px' }} />
            }
            markers={this.state.markers}
            center={this.state.center}
            >
            </InitialMap>)
  }
}
