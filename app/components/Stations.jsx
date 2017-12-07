/* global google */

import React from 'react'
import { Link } from 'react-router'
import axios from 'axios'

import MapContainer from './MapContainer'
import StationList from './StationList'
import FilterPanel from './FilterPanel'

// google.maps.geometry.spherical.computeDistanceBetween(a,b)
// to filter by nearest location upon clicking current location / typing in address

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      value: {},
      currentPos: [],
      filter: '',
      search: ''
    }
    this.generateStations = this.generateStations.bind(this)
    this.generateMarkers = this.generateMarkers.bind(this)
    this.filterStations = this.filterStations.bind(this)
    this.captureGeo = this.captureGeo.bind(this)
    this.captureGeoInput = this.captureGeoInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
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
    const listener = fireRef.orderByChild('id').on('value', snapshot => {
      this.setState({value: snapshot.val()})
    })
    this.unsubscribe = () => fireRef.off('value', listener)
  }
  filterStations(stations, filter) {
    let stationsArr = []
    // first convert objects in object to array
    for (var i in stations) {
      stationsArr.push(stations[i])
    }
    // if there is a filter, filter it by stringified subway line and set it to the stations array
    if (filter) {
      const filteredStations = stationsArr.filter((station) => {
        return station.subways.includes(filter)
      })
      stationsArr = filteredStations
    }
    return stationsArr
  }
  generateStations(stations, filter) {
    // filter if needed
    const stationsArr = this.filterStations(stations, filter)

    // generate Link/divs for each station depending on their status
    // status is string - click at station component's e.target.value is string :(
    const result = []
    stationsArr.map((station) => {
      if (station.status === 'true') {
        result.push(<Link to={`/stations/${station.id}`} key={station.name} className="moreInfo">
                      <div className="alert alert-success">
                        {station.name}
                      </div>
                    </Link>)
      } else {
        result.push(<Link to={`/stations/${station.id}`} key={station.name} className="moreInfo">
                      <div className="alert alert-danger">
                        {station.name}
                      </div>
                    </Link>)
      }
    })
    return result
  }
  generateMarkers(stations, filter) {
    // filter if needed
    const stationsArr = this.filterStations(stations, filter)

    // create array of markers at each station (ex: {lat, long})
    const markers = []
    stationsArr.map((station) => markers.push(station.location))
    return markers
  }
  captureGeo() {
    // gets current location (it's slow though...) and sets current position (centers map)
    const geoloc = navigator.geolocation.getCurrentPosition((result) => {
      this.setState({currentPos: [result.coords.latitude, result.coords.longitude]})
    })
  }
  captureGeoInput(ev) {
    ev.preventDefault()
    const result = []
    // gets current location (it's slow though...) and sets current position (centers map)
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.search}&key=AIzaSyC3rTt3torLEDvb9GNfh1LWZkDTK8GYUBk`)
    .then((res) => {
      const addressLat = res.data.results[0].geometry.location.lat
      result.push(addressLat)
      const addressLng = res.data.results[0].geometry.location.lng
      result.push(addressLng)
      return result
    })
    .then(result => this.setState({currentPos: result}))
    .then(() => {
      console.log('state', this.state, 'event', ev)
      ev.target.reset()
    })
    .catch(err => console.log(err))
  }
  handleSearchChange(ev) {
    // listens to changes in <input> and sets search value of state
    this.setState({search: ev.target.value})
  }
  handleChange(ev) {
    // listens to changes in <select> and sets filter value of state
    this.setState({filter: ev.target.value.toString()})
  }
  render() {
    const {value, filter, currentPos} = this.state || {}
    const markers = this.generateMarkers(value, filter)
    // console.log(this.state)
    return (
      <div className="container">
        <h3 className="title nearbyElevators">Elevator Access Near You</h3>

        <div className="stationsView row">
          {/* Map div*/}
          <div className="rounded stationMap col-md-6 col-sm-12">
            {/* Map itself*/}
            <div className ="panel panel-default">
              <div className="panel-heading">
                Stations Map
              </div>
              <div className="panel-body">
                <MapContainer currentPos={currentPos} markers={markers}/>
              </div>
            </div>
            {/* Map location search*/}
            <FilterPanel
              captureGeoInput={this.captureGeoInput}
              captureGeo={this.captureGeo}
              handleSearchChange={this.handleSearchChange}
              handleChange={this.handleChange}
            />
          </div>
          <StationList stations={this.generateStations(value, filter)} />
        </div>
      </div>
    )
  }
}
