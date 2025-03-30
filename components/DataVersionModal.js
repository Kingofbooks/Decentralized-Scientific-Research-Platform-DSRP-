"use client"

function DataVersionModal({ show, onHide, dataset }) {
  // Mock version history data
  const versions = [
    {
      version: dataset.version,
      date: dataset.date,
      changes: "Current version",
      size: dataset.size,
    },
    {
      version: (Number.parseFloat(dataset.version) - 0.1).toFixed(1),
      date: "2024-12-15",
      changes: "Updated metadata and fixed data inconsistencies",
      size: (Number.parseFloat(dataset.size) * 0.95).toFixed(1) + " GB",
    },
    {
      version: (Number.parseFloat(dataset.version) - 0.2).toFixed(1),
      date: "2024-11-20",
      changes: "Initial dataset upload",
      size: (Number.parseFloat(dataset.size) * 0.9).toFixed(1) + " GB",
    },
  ]

  if (!show) return null

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Version History: {dataset.title}</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Version</th>
                    <th>Date</th>
                    <th>Changes</th>
                    <th>Size</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {versions.map((version, index) => (
                    <tr key={index}>
                      <td>{version.version}</td>
                      <td>{version.date}</td>
                      <td>{version.changes}</td>
                      <td>{version.size}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2">
                          <i className="bi bi-download"></i>
                        </button>
                        {index > 0 && (
                          <button className="btn btn-sm btn-outline-secondary">
                            <i className="bi bi-arrow-counterclockwise"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataVersionModal

