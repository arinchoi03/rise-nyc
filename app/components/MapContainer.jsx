import React, { Component } from 'react'

// Components
import InitialMap from './InitialMap'

export default class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state= {
      currentPos: [],
      markers: []
    }
  }
  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent to us by our parent component change,
    // start listening to the new firebase reference.
    this.setState({
      currentPos: incoming.currentPos, // returns an array
      markers: incoming.markers
    })
  }
  render() {
    return (<InitialMap
            containerElement={
                <div style={{ height: '100%', width: '100%' }} />
              }
            mapElement={
              <div style={{ height: '500px', width: '500px' }} />
            }
            markers={this.state.markers}
            currentPos={this.state.currentPos}
            />)
  }
}
