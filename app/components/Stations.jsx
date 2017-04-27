import React from 'react'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  componentDidMount() {
    // When the component mounts, start listening to the fireRef
    // we were given.
    console.log('props.fireRef', this.props.fireRef)
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

  listenTo(fireRef) {
    // If we're already listening to a ref, stop listening there.
    if (this.unsubscribe) this.unsubscribe()
    console.log('am i in listento?', fireRef)
    // Whenever our ref's value changes, set {value} on our state.
    console.log('fireRef children', fireRef.child('station1').child('name'))
    const listener = fireRef.child('station1').child('name').on('value', snapshot => {
      console.log('snapshot value', fireRef.child('station1').child('name'))
      this.setState({value: snapshot.val()})
    })
    fireRef.child('station1').child('name').set('MurrayHill')
    // Set unsubscribe to be a function that detaches the listener.
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

  render() {
    const {value} = this.state || {}
    console.log('value from local', this.state.value)
    return (<div>
      <h1>Hi</h1>
      <p>{value}</p>
    </div>
    )
  }
}
