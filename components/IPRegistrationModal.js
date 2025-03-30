"use client"

import { useState } from "react"

function IPRegistrationModal({ show, onHide, onRegister }) {
  const [formData, setFormData] = useState({
    title: "",
    type: "method",
    description: "",
    collaborators: "",
    termsOfUse: "academic",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(formData)
  }

  if (!show) return null

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register Intellectual Property</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select className="form-select" id="type" name="type" value={formData.type} onChange={handleChange}>
                  <option value="method">Method/Process</option>
                  <option value="software">Software</option>
                  <option value="data">Dataset</option>
                  <option value="hardware">Hardware Design</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="collaborators" className="form-label">
                  Collaborators (if any)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="collaborators"
                  name="collaborators"
                  placeholder="Enter names, separated by commas"
                  value={formData.collaborators}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="termsOfUse" className="form-label">
                  Default Terms of Use
                </label>
                <select
                  className="form-select"
                  id="termsOfUse"
                  name="termsOfUse"
                  value={formData.termsOfUse}
                  onChange={handleChange}
                >
                  <option value="academic">Academic Use Only</option>
                  <option value="commercial">Commercial License Required</option>
                  <option value="open">Open Source/Open Access</option>
                  <option value="restricted">Restricted Access</option>
                </select>
              </div>

              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="confirmOwnership" required />
                <label className="form-check-label" htmlFor="confirmOwnership">
                  I confirm that I am the rightful owner or authorized representative of this intellectual property.
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Register IP
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IPRegistrationModal

