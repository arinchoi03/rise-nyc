import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'

import MapContainer from './MapContainer'
import InitialMap from './InitialMap'
/* global describe it beforeEach */
describe('<MapContainer/>', () => {
  describe('on render', () => {
    let root
    beforeEach('render the root', () =>
      root = shallow(<MapContainer/>)
    )

    it('displays an Initial Map component', () => {
      expect(root.find(InitialMap)).to.have.length(1)
    })
  })

  // describe('when an anonymous user is logged in', () => {
    // const user = {
      // displayName: null,
      // isAnonymous: true,
    // }
    // let root<D-V>
    // beforeEach('render the root', () =>
      // root = shallow(<WhoAmI user={user}/>)
    // )

    // it('says hello to Anonymous', () => {
      // expect(root.text()).to.contain('Anonymous')
    // })

    // it('displays a Login component', () => {
      // expect(root.find(Login)).to.have.length(1)
    // })
  // })

  // describe('when a user is logged in', () => {
    // const user = {
      // isAnonymous: false,
      // displayName: 'Grace Hopper',
    // }
    // const fakeAuth = {signOut: spy()}
    // let root
    // beforeEach('render the root', () =>
      // root = shallow(<WhoAmI user={user} auth={fakeAuth}/>)
    // )

    // it('has a logout button', () => {
      // expect(root.find('button.logout')).to.have.length(1)
    // })

    // it('calls props.auth.signOut when logout is tapped', () => {
      // root.find('button.logout').simulate('click')
      // expect(fakeAuth.signOut).to.have.been.called
    // })
  // })
})
