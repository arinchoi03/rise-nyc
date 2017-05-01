import React, { Component } from 'react'
import { SearchBox } from 'react-google-maps'

// Components
import InitialMap from './InitialMap'

// const inputStyle = {
//   'border': '1px solid transparent',
//   'borderRadius': '1px',
//   'boxShadow': '0 2px 6px rgba(0, 0, 0, 0.3)',
//   'boxSizing': 'border-box',
//   'MozBoxSizing': 'border-box',
//   'fontSize': '14px',
//   'height': '32px',
//   'marginTop': '27px',
//   'outline': 'none',
//   'padding': '0 12px',
//   'textOverflow': 'ellipses',
//   'width': '400px'
// }

export default class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state= {
      center: [],
      markers: [],
      bounds: null,
    }
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this)
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this)
  }
  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent to us by our parent component change,
    // start listening to the new firebase reference.
    console.log('iNCOMING', incoming)
    this.setState({
      center: incoming.currentPos, // returns an array
      markers: incoming.markers
    })
  }
  // handlePlacesChanged() {
  //   const places = this.refs.searchBox.getPlaces()
  //   const markers = []

  //   // Add a marker for each place returned from search bar
  //   places.forEach(function(place) {
  //     markers.push({
  //       position: place.geometry.location
  //     })
  //   })
  // }
  // handleBoundsChanged() {
  //   this.setState({
  //     bounds: this.refs.map.getBounds(),
  //     center: this.refs.map.getCenter()
  //   })
  // }
  render() {
    console.log('state in mapcontainer', this.state)
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
