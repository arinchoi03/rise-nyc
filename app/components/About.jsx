import React from 'react'

const About = (props) => {
  return (
    <div className="about-page col-md-6">
      <div>
        <h2>About</h2>
        <p>This app was made to answer the problems of commuters in NYC, especially those with disabilities, the elderly, and travelers with heavy luggage/strollers.
        This app allows easy access to elevator status information so that you never have to step into a station without knowing if you'll have access to the world above.</p>
        <h4>Stations Page</h4>
        <p>Currently, you can navigate on the map by clicking 'Current Location' button.
        The seraching features are coming soon! The stations list should reflect the most recent status of the stations
        We will be adding MORE features: filter by borough, more stations, etc!</p>
        <h4>Station Page</h4>
        <p>Click on the 'Working' or 'Broken' buttons to update the current status at your station!
        The log only shows the 10 most recent issues logged in the database.</p>
        <h4>This Project</h4>
        <p>Was built by Y. Arin Choi in 2017 during her Grace Hopper Academy Program. It will be updated and refactored SOON!
        React/react-google-map/firebase was used to create this project.</p>
      </div>
    </div>
  )
}

export default About
