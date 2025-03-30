"use client"

import { useState } from "react"

function FundingProposalModal({ show, onHide, onCreate }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    duration: "",
    description: "",
    milestones: [
      { title: "", funds: "", description: "" },
      { title: "", funds: "", description: "" },
      { title: "", funds: "", description: "" },
    ],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...formData.milestones]
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      milestones: updatedMilestones,
    })
  }

  const handleAddMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, { title: "", funds: "", description: "" }],
    })
  }

  const handleRemoveMilestone = (index) => {
    const updatedMilestones = [...formData.milestones]
    updatedMilestones.splice(index, 1)
    setFormData({
      ...formData,
      milestones: updatedMilestones,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Convert string amounts to numbers
    const processedData = {
      ...formData,
      amount: Number.parseFloat(formData.amount),
      milestones: formData.milestones.map((milestone) => ({
        ...milestone,
        funds: Number.parseFloat(milestone.funds),
        status: "pending",
      })),
    }

    onCreate(processedData)
  }

  if (!show) return null

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Funding Proposal</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Proposal Title
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

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="amount" className="form-label">
                    Funding Amount ($)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="duration" className="form-label">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="duration"
                    name="duration"
                    placeholder="e.g., 18 months"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Proposal Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <h6 className="mt-4 mb-3">Milestones</h6>

              {formData.milestones.map((milestone, index) => (
                <div className="card mb-3" key={index}>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-8">
                        <label className="form-label">Milestone Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={milestone.title}
                          onChange={(e) => handleMilestoneChange(index, "title", e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Funds ($)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={milestone.funds}
                          onChange={(e) => handleMilestoneChange(index, "funds", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={milestone.description}
                        onChange={(e) => handleMilestoneChange(index, "description", e.target.value)}
                        required
                      ></textarea>
                    </div>
                    {formData.milestones.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveMilestone(index)}
                      >
                        Remove Milestone
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button type="button" className="btn btn-sm btn-outline-primary mb-3" onClick={handleAddMilestone}>
                Add Milestone
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Create Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FundingProposalModal

