import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      value: {}
    }
    this.generateStations = this.generateStations.bind(this)
  }
  componentDidMount() {
    // When the component mounts, start listening to the fireRef
    // we were given.
    console.log('fireref', this.props.fireRef)
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
      result.push(<tr key={i}>
                      <td>
                        <Link to={`/stations/${current.name}`}>
                          {current.name}
                        </Link>
                    </td>
                    <td>{current.status}</td>
                  </tr>)
    }
    return result
  }
  render() {
    const {value} = this.state || {}
    console.log('stations from local', this.state.value)
    return (<div className="stationsView">
              <h3 className="title nearbyElevators">Elevator Access Near You</h3>
              <div className="rounded stationMap col-md-6">
                <h2 className="lead">Stations Map</h2>
                <div>
                <iframe className="googleMap" src="https://www.google.com/maps/embed/v1/view?key=AIzaSyCdwbqBA0j9ZOuwa0GqvVXVgL7Mdbu0mHI&zoom=10&center=40.7128%2C-74.0059">
                </iframe>
                </div>
              </div>
              <div className="rounded stationInfo col-md-6">
                <h2 className="lead">Stations List</h2>
                <table className="table-bordered table-hover stationList">
                  <thead>
                    <tr>
                      <th>Station</th>
                      <th>Current Status</th>
                    </tr>
                  </thead>
                  <tbody>
                   {this.generateStations(this.state.value)}
                  </tbody>
                </table>
              </div>
            </div>
    )
  }
}
