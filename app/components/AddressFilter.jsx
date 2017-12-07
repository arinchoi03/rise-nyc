import React from 'react'

const AddressFilter = (props) => {
  return (<div>
    <div> Search by Address </div>
          <div className="input-group station-page-input">
            <form onSubmit={props.captureGeoInput}>
              <input
                type="text"
                className="form-control input-box"
                placeholder="Enter Address for Nearby Elevator Access"
                onChange={props.handleSearchChange} />
              <span className="input-group-btn">
                <button className="btn btn-default" type="submit">Search</button>
              </span>
            </form>
          </div>
        </div>
    )
}

export default AddressFilter;
