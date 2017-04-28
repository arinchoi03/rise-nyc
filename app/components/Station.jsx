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
    console.log('props in station', this.props.routeParams.name)
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
    const currentStation = this.props.routeParams.name
    const listener = fireRef.child(currentStation).on('value', snapshot => {
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
                        <Link to={`/stations/current.name`}>
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
    console.log('value from local state', this.state.value)
    return (<div className="stationsView">
              <h3 className="title nearbyElevators">Elevator Access Near You</h3>
              <div className="rounded stationMap col-md-6">
                <h2 className="lead">Station Photo</h2>
                <div className="stationImage">
                </div>
              </div>
              <div className="rounded stationInfo col-md-6">
                <h2 className="lead">Issues Logged</h2>
                <table className="table-bordered table-hover stationList">
                  <thead>
                    <tr>
                      <th>Date Reported</th>
                      <th>Status</th>
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
