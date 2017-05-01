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
  // componentDidMount() {
  //   this.setState({
  //     currentPos: this.props.currentPos,
  //     markers: this.props.markers
  //   })
  // }
  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent to us by our parent component change,
    // start listening to the new firebase reference.
    console.log(incoming)
    this.setState({
      currentPos: incoming.currentPos, // returns an array
      markers: incoming.markers
    })
  }
  render() {
    console.log('local state in map container', this.state)
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
