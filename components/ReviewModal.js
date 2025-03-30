"use client"

import { useState } from "react"

function ReviewModal({ show, onHide, manuscript, onSubmit }) {
  const [formData, setFormData] = useState({
    completeness: 80,
    constructiveness: 75,
    clarity: 85,
    objectivity: 90,
    timeliness: 95,
    thoroughness: 80,
    helpfulness: 85,
    consistency: 80,
    comments: "",
    strengths: "",
    weaknesses: "",
    recommendations: "",
    flagBiased: false,
    flagEthical: false,
    flagReasons: "",
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const calculateOverallScore = () => {
    const scores = [
      formData.completeness,
      formData.constructiveness,
      formData.clarity,
      formData.objectivity,
      formData.timeliness,
      formData.thoroughness,
      formData.helpfulness,
      formData.consistency,
    ]
    return Math.round(scores.reduce((a, b) => Number.parseInt(a) + Number.parseInt(b), 0) / scores.length)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      overallScore: calculateOverallScore(),
    })
  }

  if (!show) return null

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Review: {manuscript.title}</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <h6>Manuscript Information</h6>
                <div className="card bg-light">
                  <div className="card-body">
                    <p>
                      <strong>Author:</strong> {manuscript.author}
                    </p>
                    <p>
                      <strong>Institution:</strong> {manuscript.institution}
                    </p>
                    <p>
                      <strong>Date:</strong> {manuscript.date}
                    </p>
                    <p>
                      <strong>Abstract:</strong> {manuscript.abstract}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h6>Quality Metrics</h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="completeness" className="form-label d-flex justify-content-between">
                      <span>Completeness</span>
                      <span>{formData.completeness}/100</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="completeness"
                      name="completeness"
                      min="0"
                      max="100"
                      value={formData.completeness}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="constructiveness" className="form-label d-flex justify-content-between">
                      <span>Constructiveness</span>
                      <span>{formData.constructiveness}/100</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="constructiveness"
                      name="constructiveness"
                      min="0"
                      max="100"
                      value={formData.constructiveness}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="clarity" className="form-label d-flex justify-content-between">
                      <span>Clarity</span>
                      <span>{formData.clarity}/100</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="clarity"
                      name="clarity"
                      min="0"
                      max="100"
                      value={formData.clarity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="objectivity" className="form-label d-flex justify-content-between">
                      <span>Objectivity</span>
                      <span>{formData.objectivity}/100</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="objectivity"
                      name="objectivity"
                      min="0"
                      max="100"
                      value={formData.objectivity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="timeliness" className="form-label d-flex justify-content-between">
                      <span>Timeliness</span>
                      <span>{formData.timeliness}/100</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="timeliness"
                      name="timeliness"
                      min="0"
                      max="100"
                      value={formData.timeliness}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="thoroughness" className="form-label d-flex justify-content-between">
                      <span>Thoroughness</span>
                      <span>{formData.thoroughness}/100</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="thoroughness"
                      name="thoroughness"
                      min="0"
                      max="100"
                      value={formData.thoroughness}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="helpfulness" className="form-label d-flex justify-content-between">
                      <span>Helpfulness</span>
                      <span>{formData.helpfulness}/100</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="helpfulness"
                      name="helpfulness"
                      min="0"
                      max="100"
                      value={formData.helpfulness}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="consistency" className="form-label d-flex justify-content-between">
                      <span>Consistency</span>
                      <span>{formData.consistency}/100</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="consistency"
                      name="consistency"
                      min="0"
                      max="100"
                      value={formData.consistency}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="alert alert-info">
                    <strong>Overall Score: {calculateOverallScore()}/100</strong>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h6>Detailed Feedback</h6>
                <div className="mb-3">
                  <label htmlFor="comments" className="form-label">
                    General Comments
                  </label>
                  <textarea
                    className="form-control"
                    id="comments"
                    name="comments"
                    rows="3"
                    value={formData.comments}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="strengths" className="form-label">
                    Strengths
                  </label>
                  <textarea
                    className="form-control"
                    id="strengths"
                    name="strengths"
                    rows="3"
                    value={formData.strengths}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="weaknesses" className="form-label">
                    Weaknesses
                  </label>
                  <textarea
                    className="form-control"
                    id="weaknesses"
                    name="weaknesses"
                    rows="3"
                    value={formData.weaknesses}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="recommendations" className="form-label">
                    Recommendations for Improvement
                  </label>
                  <textarea
                    className="form-control"
                    id="recommendations"
                    name="recommendations"
                    rows="3"
                    value={formData.recommendations}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="mb-4">
                <h6>Flags</h6>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flagBiased"
                    name="flagBiased"
                    checked={formData.flagBiased}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="flagBiased">
                    Flag for potential bias
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flagEthical"
                    name="flagEthical"
                    checked={formData.flagEthical}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="flagEthical">
                    Flag for ethical concerns
                  </label>
                </div>
                {(formData.flagBiased || formData.flagEthical) && (
                  <div className="mb-3 mt-2">
                    <label htmlFor="flagReasons" className="form-label">
                      Reason for flags
                    </label>
                    <textarea
                      className="form-control"
                      id="flagReasons"
                      name="flagReasons"
                      rows="2"
                      value={formData.flagReasons}
                      onChange={handleChange}
                      required={formData.flagBiased || formData.flagEthical}
                    ></textarea>
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal

