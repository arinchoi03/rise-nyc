import React from 'react'
import { Link } from 'react-router'
import firebase from 'APP/fire'

import StationIssues from './StationIssues'
import StationMap from './StationMap'

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = {
      value: {},
      issues: [],
      newIssue: null
    }
    // this.generateStation = this.generateStation.bind(this)
    // this.generateMarkers = this.generateMarkers.bind(this)
    this.generateIssues = this.generateIssues.bind(this)
    // this.generateCurrentLoc = this.generateCurrentLoc.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    // When the component mounts, start listening to the fireRef
    // we were given.
    this.listenTo(this.props.fireRef, this.props.issueRef)
  }

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
    const listenerIssue = issueRef.orderByChild('stationId').equalTo(currentStationId).limitToLast(10).on('value', snapshot => {
      return this.setState({issues: this.generateIssues(snapshot.val())})
    })
    this.unsubscribe = () => {
      fireRef.off('value', listener)
      issueRef.off('value', listenerIssue)
    }
  }
  generateIssues(returnObj) {
    // if no issues for this station, just return empty array
    if (!returnObj) {
      return []
    } else {
      // for the returned object, push each issue into the array with timestamp
      const result = []
      for (var i in returnObj) {
        const currentObj = returnObj[i]
        result.push({issue: currentObj.issue, timestamp: currentObj.timestamp})
      }
      return result.reverse()
    }
  }
  handleClick(e) {
    // this updates current status on Stations page
    const newIssue = e.target.value
    const stationName = Object.keys(this.state.value)[0]
    this.props.fireRef.child(stationName).update({
      status: newIssue
    })
    // this saves the new issue to the array of issues on Station page
    const currentStationId = this.props.routeParams.id
    this.props.issueRef.push({
      issue: newIssue,
      stationId: currentStationId,
      timestamp: new Date().getTime()
    })
  }
  render() {
    const {value} = this.state || {}
    // const currentStation = this.generateStation(value)
    // const marker = this.generateMarkers(value)
    // const currentLoc = this.generateCurrentLoc(value)
    const issues = this.state.issues

    // console.log('marker', marker, 'currentLoc', currentLoc)

    return (<div className="container">
            <Link to="/stations">Back to Stations</Link>
              <div className="row">
                <StationMap
                  value={value}
                />
                <div className="col-md-6 col-sm-12">
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
                  <StationIssues
                   issues={issues}
                  />
                </div>
              </div>
            </div>
    )
  }
}
