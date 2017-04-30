import React from 'react'
import { Link } from 'react-router'

import MapContainer from './MapContainer'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      value: {},
      currentPos: []
    }
    this.generateStations = this.generateStations.bind(this)
    this.generateMarkers = this.generateMarkers.bind(this)
    this.captureGeo = this.captureGeo.bind(this)
  }
  componentDidMount() {
    // When the component mounts, start listening to the fireRef
    // we were given.
    this.listenTo(this.props.fireRef)
  }

  componentWillUnmount() {
    // When we unmount, stop listening.
    this.unsubscribe()
  }

  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent to us by our parent component change,
    // start listening to the new firebase reference.
    this.listenTo(incoming.fireRef)
  }

  // listen to the fireRef.child
  listenTo(fireRef) {
    // If we're already listening to a ref, stop listening there.
    if (this.unsubscribe) this.unsubscribe()
    // Whenever our ref's value changes, set {value} on our state.
    const listener = fireRef.on('value', snapshot => {
      this.setState({value: snapshot.val()})
    })
    this.unsubscribe = () => fireRef.off('value', listener)
  }

  // Write is defined using the class property syntax.
  // This is roughly equivalent to saying,
  //
  //    this.write = event => (etc...)
  //
  // in the constructor. Incidentally, this means that write
  // is always bound to this.
  write = event => this.props.fireRef &&
    this.props.fireRef.set(event.target.value)
  generateStations(stations) {
    const result = []
    for (var i in stations) {
      const current = stations[i]
      if (current.status) {
        result.push(<div key={i} className="alert alert-success">
                    {current.name}
                    <Link to={`/stations/${current.id}`} className="moreInfo">
                      More Info
                    </Link>
                  </div>)
      } else {
        result.push(<div key={i} className="alert alert-danger">
            {current.name}
            <Link to={`/stations/${current.id}`} className="moreInfo">
              More Info
            </Link>
          </div>)
      }
    }
    return result
  }
  generateMarkers(stations) {
    const markers = []
    for (var i in stations) {
      const current = stations[i]
      markers.push(current.location)
    }
    return markers
  }
  captureGeo() {
    const geoloc = navigator.geolocation.getCurrentPosition((result) => {
      this.setState({currentPos: [result.coords.latitude, result.coords.longitude]})
    })
  }
  render() {
    const {value} = this.state || {}
    const markers = this.generateMarkers(value)
    const currentPos = this.state.currentPos
    console.log('stations from local', this.state)
    // for MapContainer - push in location objects into array to be received as markers
    return (<div className="container">
            <div className="stationsView row">
              <h3 className="title nearbyElevators">Elevator Access Near You</h3>
              <div className="rounded stationMap col-lg-6">
                <div className ="panel panel-default">
                  <div className="panel-heading">
                    Stations Map
                  </div>
                  <div className="panel-body">
                    <MapContainer currentPos={currentPos} markers={markers}/>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    Search New Location
                  </div>
                  <div className="panel-body">
                    <div className="input-group front-page-input">
                      <input type="text" className="form-control" placeholder="Enter Address for Nearby Elevator Access" />
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button">Go!</button>
                      </span>
                    </div>
                    <div id="current-location-search">Current Location
                      <button className="btn btn-default" onClick={this.captureGeo}>
                        <span className="glyphicon glyphicon-search"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded stationInfo col-lg-6">
                <div className ="panel panel-default">
                  <div className="panel-heading">
                    Stations List
                  </div>
                  <div className="panel-body">
                    {(this.generateStations(this.state.value))}
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
  }
}

                // <iframe className="googleMap" src="https://www.google.com/maps/embed/v1/view?key=AIzaSyCdwbqBA0j9ZOuwa0GqvVXVgL7Mdbu0mHI&zoom=10&center=40.7128%2C-74.0059">
                // </iframe>
