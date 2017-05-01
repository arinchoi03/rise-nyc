import React from 'react'
import { Link } from 'react-router'
// navigator.getGeolocation?

const FrontPage = (props) => {
  return (
    <div>
      <header id="top" className="header">
        <div className = "text-vertical-center">
          <h1><Link to="/stations">RISE UP</Link></h1>
          <h2>NYC</h2>
        </div>
      </header>
    </div>
  )
}

export default FrontPage
