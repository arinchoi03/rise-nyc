import React from 'react'

const StationIssues = (props) => {
  const issues = props.issues
  return (
    <div className="row col-md-12 issues-log">
      <div className="panel panel-default">
        <div className="panel-heading">
             Issues Log
        </div>
        <div className="panel-body">
          <table className="table-bordered table-hover station-list">
            <thead>
              <tr>
                <th>Date Reported</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {issues && issues.map((issue, idx) => (
                <tr key={idx}>
                  <td>{new Date(issue.timestamp).toString()}</td>
                  <td>{issue.issue === 'true' ? 'Working' : 'Broken'}</td>
                </tr>)
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
   )
}

export default StationIssues
