"use client"

import { useState } from "react"

function LicenseModal({ show, onHide, ip }) {
  const [showNewLicenseForm, setShowNewLicenseForm] = useState(false)
  const [newLicense, setNewLicense] = useState({
    licensee: "",
    type: "academic",
    fee: 0,
    duration: "1 year",
  })

  const handleNewLicenseChange = (e) => {
    const { name, value } = e.target
    setNewLicense({
      ...newLicense,
      [name]: value,
    })
  }

  const handleAddLicense = () => {
    // In a real app, this would call an API to add the license
    console.log("Adding license:", newLicense)
    setShowNewLicenseForm(false)
    setNewLicense({
      licensee: "",
      type: "academic",
      fee: 0,
      duration: "1 year",
    })
  }

  if (!show) return null

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Licenses for {ip.title}</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            {ip.licenses.length > 0 ? (
              <div className="table-responsive mb-4">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Licensee</th>
                      <th>Type</th>
                      <th>Fee</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ip.licenses.map((license) => (
                      <tr key={license.id}>
                        <td>{license.licensee}</td>
                        <td className="text-capitalize">{license.type}</td>
                        <td>{license.fee > 0 ? `$${license.fee}` : "Free"}</td>
                        <td>{license.date}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="alert alert-info">No licenses have been created for this intellectual property yet.</div>
            )}

            {!showNewLicenseForm ? (
              <button className="btn btn-primary" onClick={() => setShowNewLicenseForm(true)}>
                <i className="bi bi-plus-circle me-2"></i>
                Add New License
              </button>
            ) : (
              <div className="card mt-3">
                <div className="card-header">
                  <h6 className="mb-0">New License</h6>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="licensee" className="form-label">
                        Licensee
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="licensee"
                        name="licensee"
                        value={newLicense.licensee}
                        onChange={handleNewLicenseChange}
                        required
                      />
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="type" className="form-label">
                          License Type
                        </label>
                        <select
                          className="form-select"
                          id="type"
                          name="type"
                          value={newLicense.type}
                          onChange={handleNewLicenseChange}
                        >
                          <option value="academic">Academic</option>
                          <option value="commercial">Commercial</option>
                          <option value="non-profit">Non-Profit</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="fee" className="form-label">
                          License Fee ($)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="fee"
                          name="fee"
                          value={newLicense.fee}
                          onChange={handleNewLicenseChange}
                          min="0"
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="duration" className="form-label">
                          Duration
                        </label>
                        <select
                          className="form-select"
                          id="duration"
                          name="duration"
                          value={newLicense.duration}
                          onChange={handleNewLicenseChange}
                        >
                          <option value="1 year">1 Year</option>
                          <option value="2 years">2 Years</option>
                          <option value="5 years">5 Years</option>
                          <option value="perpetual">Perpetual</option>
                        </select>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={() => setShowNewLicenseForm(false)}
                      >
                        Cancel
                      </button>
                      <button type="button" className="btn btn-primary" onClick={handleAddLicense}>
                        Add License
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
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

export default LicenseModal

