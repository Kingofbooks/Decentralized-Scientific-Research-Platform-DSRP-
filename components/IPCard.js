"use client"

import { useState } from "react"
import LicenseModal from "./LicenseModal"

function IPCard({ ip }) {
  const [showLicenseModal, setShowLicenseModal] = useState(false)

  const getStatusBadge = (status) => {
    switch (status) {
      case "registered":
        return "bg-success"
      case "pending":
        return "bg-warning text-dark"
      case "disputed":
        return "bg-danger"
      default:
        return "bg-secondary"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "method":
        return "bi-gear"
      case "software":
        return "bi-code-square"
      case "data":
        return "bi-database"
      case "hardware":
        return "bi-cpu"
      default:
        return "bi-file-earmark"
    }
  }

  return (
    <>
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="d-flex">
              <div className={`bg-light p-2 rounded me-3`}>
                <i className={`bi ${getTypeIcon(ip.type)} fs-4`}></i>
              </div>
              <div>
                <h5 className="card-title mb-0">{ip.title}</h5>
                <small className="text-muted text-capitalize">{ip.type}</small>
              </div>
            </div>
            <span className={`badge ${getStatusBadge(ip.status)}`}>{ip.status}</span>
          </div>

          <div className="d-flex mb-3">
            <div className="me-3">
              <small className="text-muted d-block">Owner</small>
              <span>{ip.owner}</span>
            </div>
            <div className="me-3">
              <small className="text-muted d-block">Institution</small>
              <span>{ip.institution}</span>
            </div>
            <div>
              <small className="text-muted d-block">Registration Date</small>
              <span>{ip.registrationDate}</span>
            </div>
          </div>

          <div className="mb-3">
            <small className="text-muted d-block">Description</small>
            <p className="card-text">{ip.description}</p>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small className="text-muted">Licenses ({ip.licenses.length})</small>
              {ip.status === "registered" && (
                <button className="btn btn-sm btn-link p-0" onClick={() => setShowLicenseModal(true)}>
                  Manage Licenses
                </button>
              )}
            </div>

            {ip.licenses.length > 0 ? (
              <div className="list-group list-group-flush">
                {ip.licenses.slice(0, 2).map((license) => (
                  <div className="list-group-item px-0" key={license.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span>{license.licensee}</span>
                        <small className="text-muted d-block">{license.date}</small>
                      </div>
                      <div>
                        <span className="badge bg-info me-2 text-capitalize">{license.type}</span>
                        {license.fee > 0 && <span className="badge bg-success">${license.fee}</span>}
                      </div>
                    </div>
                  </div>
                ))}
                {ip.licenses.length > 2 && (
                  <button className="btn btn-sm btn-link" onClick={() => setShowLicenseModal(true)}>
                    View all {ip.licenses.length} licenses
                  </button>
                )}
              </div>
            ) : (
              <p className="text-muted small">No licenses yet</p>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-sm btn-outline-primary">
              <i className="bi bi-file-earmark-text me-1"></i>
              View Details
            </button>

            {ip.status === "registered" && (
              <button className="btn btn-sm btn-outline-secondary">
                <i className="bi bi-share me-1"></i>
                Share
              </button>
            )}
          </div>
        </div>
      </div>

      <LicenseModal show={showLicenseModal} onHide={() => setShowLicenseModal(false)} ip={ip} />
    </>
  )
}

export default IPCard

