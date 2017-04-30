import React from 'react'
import { Link } from 'react-router'

import MapContainer from './MapContainer'

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = {
      value: {},
      issues: [],
      newIssue: null
    }
    this.generateStation = this.generateStation.bind(this)
    this.generateMarkers = this.generateMarkers.bind(this)
    this.handleClick = this.handleClick.bind(this)
    // this.updateLocalState = this.updateLocalState.bind(this)
  }
  componentDidMount() {
    // When the component mounts, start listening to the fireRef
    // we were given.
    // console.log('auth in station', this.props.auth.currentUser.uid.slice(0, 4))
    this.listenTo(this.props.fireRef, this.props.issueRef)
  }
  // componentWillMount() {
  //   this.props.issueRef.on('child_added', snapshot => {
  //     const response = snapshot.val()
  //     this.updateLocalState(response)
  //   })
  // }
  componentWillUnmount() {
    // When we unmount, stop listening.
    this.unsubscribe()
  }

  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent to us by our parent component change,
    // start listening to the new firebase reference.
    this.listenTo(incoming.fireRef, incoming.issueRef)
  }

  // listen to the fireRef.child
  listenTo(fireRef, issueRef) {
    // If we're already listening to a ref, stop listening there.
    if (this.unsubscribe) this.unsubscribe()
    // Whenever our ref's value changes, set {value} on our state.
    const currentStationId = this.props.routeParams.id

    const listener = fireRef.orderByChild('id').equalTo(+currentStationId).on('value', snapshot => {
      return this.setState({value: snapshot.val()})
    })
    const listenerIssue = issueRef.orderByChild('id').equalTo(+currentStationId).on('value', snapshot => {
      return this.setState({issues: this.generateIssues(snapshot.val())})
    })
    this.unsubscribe = () => {
      fireRef.off('value', listener)
      issueRef.off('value', listenerIssue)
    }
  }

  // Write is defined using the class property syntax.
  // This is roughly equivalent to saying,
  //
  //    this.write = event => (etc...)
  //
  // in the constructor. Incidentally, this means that write
  // is always bound to this.
  write = event => this.props.issueRef &&
    this.props.issueRef.set(event.target.value)
  generateStation(station) {
    const result = []
    for (var i in station) {
      const current = station[i]
      result.push(<div><h2>{current.name}</h2></div>)
    }
    return result
  }
  generateMarkers(station) {
    const result = []
    for (var i in station) {
      const current = station[i]
      result.push(current.location)
    }
    return result
  }
  generateIssues(issues) {
    if (!issues.log) {
      return []
    } else {
      const result = []
      const keyName = Object.keys(issues)[0]
      for (var i in issues[keyName].log) {
        const current = issues[keyName].log[i]
        result.push(current)
      }
      return result
    }
  }
  handleClick(e) {
    const newIssue = e.target.value
    this.state.issues.push(newIssue)
    const currentStationId = this.props.routeParams.id
  }
  // updateLocalState(response) {
  //   const issues = this.state.issues
  //   issues.push(response)
  //   this.setState({
  //     issues: issues
  //   })
  // }
  render() {
    const {value} = this.state || {}
    const currentStation = this.generateStation(value)
    const marker = this.generateMarkers(value)
    // console.log('the state in station', this.state)
    return (<div className="container">
              <div className="row">
                  <h3 className="title nearbyElevators">Elevator Access Near You</h3>
                  <div className="col-lg-6">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                    {currentStation}
                    </div>
                    <div className="panel-body">
                      <MapContainer markers={marker}/>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div><label>Report the Current Status</label></div>
                  <div className="row button-row">
                    <div className="col-lg-6">
                      <button
                        value={true}
                        className="btn btn-success btn-lg btn-block"
                        onClick={this.handleClick}>
                        Working
                      </button>
                    </div>
                    <div className="col-lg-6">
                      <button
                        value={false}
                        className="btn btn-danger btn-lg btn-block"
                        onClick={this.handleClick}>
                        Broken
                      </button>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      Issues Log
                    </div>
                    <div className="panel-body">
                      <table className="table-bordered table-hover stationList">
                        <thead>
                          <tr>
                            <th>Date Reported</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
  }
}
