import React from 'react'

const nycStations = ['', '1', '2', '3', '4', '5', '6', '7', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'L', 'M', 'N', 'Q', 'R', 'S', 'W', 'Z']
const StationsFilter = (props) => {
  return (
            <div className="input-group front-page-input">
              <form>
                <label>Select Your Subway Line</label>
                <select onChange={props.handleChange}>
                  { nycStations.map(station => (<option key={station}>{station}</option>)) }
                </select>
              </form>
            </div>
  )
}

export default StationsFilter;
